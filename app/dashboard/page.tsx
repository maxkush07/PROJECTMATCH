import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { signOut } from '@/auth';

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/auth/login');
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-card">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <div className="text-2xl font-bold text-accent">ProjectMatch</div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Welcome, {session.user.name}
            </span>
            <form
              action={async () => {
                'use server';
                await signOut();
              }}
            >
              <Button variant="outline" type="submit">
                Sign Out
              </Button>
            </form>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b border-border bg-card/50">
        <div className="container flex gap-8 h-14 items-center">
          <Link
            href="/dashboard"
            className="text-sm font-medium text-accent border-b-2 border-accent pb-4 flex items-center h-full"
          >
            Explore
          </Link>
          <Link
            href="/profile"
            className="text-sm font-medium text-muted-foreground hover:text-foreground pb-4 flex items-center h-full"
          >
            Profile
          </Link>
          <Link
            href="/projects"
            className="text-sm font-medium text-muted-foreground hover:text-foreground pb-4 flex items-center h-full"
          >
            My Projects
          </Link>
          <Link
            href="/messages"
            className="text-sm font-medium text-muted-foreground hover:text-foreground pb-4 flex items-center h-full"
          >
            Messages
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Completion</CardTitle>
              <CardDescription>45%</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full bg-card rounded-full h-2">
                <div
                  className="bg-accent h-2 rounded-full"
                  style={{ width: '45%' }}
                />
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Complete your profile to get better matches
              </p>
              <Link href="/profile" className="mt-4 inline-block">
                <Button size="sm" variant="outline" className="w-full">
                  Complete Profile
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Recent Matches */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Matches</CardTitle>
              <CardDescription>3 new matches this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3 pb-3 border-b border-border last:border-0">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                      <span className="text-sm font-semibold">U{i}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">User {i}</p>
                      <p className="text-xs text-muted-foreground">Designer</p>
                    </div>
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Active Projects */}
          <Card>
            <CardHeader>
              <CardTitle>Active Projects</CardTitle>
              <CardDescription>1 ongoing project</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-card border border-border rounded-lg">
                  <p className="font-medium text-sm">Project Name</p>
                  <p className="text-xs text-muted-foreground mt-1">Looking for: Frontend Developer</p>
                  <div className="mt-3 flex gap-1">
                    <Badge variant="secondary" className="text-xs">Active</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recommendations Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Recommended for You</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="hover:border-accent transition-colors cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                        <span className="text-lg font-semibold">U{i}</span>
                      </div>
                      <div>
                        <CardTitle className="text-base">Creator {i}</CardTitle>
                        <CardDescription>Web Developer</CardDescription>
                      </div>
                    </div>
                    <Badge>92% Match</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Passionate about building web applications with React and Node.js
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs">React</Badge>
                    <Badge variant="outline" className="text-xs">Node.js</Badge>
                    <Badge variant="outline" className="text-xs">TypeScript</Badge>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" className="flex-1">
                      Connect
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      View Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
