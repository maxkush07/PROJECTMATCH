import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-card">
      {/* Navigation */}
      <nav className="border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <div className="text-2xl font-bold text-accent">ProjectMatch</div>
          <div className="flex gap-4">
            <Link href="/auth/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/auth/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container py-20 text-center">
        <h1 className="text-5xl font-bold mb-6 text-foreground">
          Connect with Talented Creators
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Find the perfect co-founders, collaborators, and team members for your next big project.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/auth/register">
            <Button size="lg" className="px-8">Start Collaborating</Button>
          </Link>
          <Link href="#features">
            <Button size="lg" variant="outline" className="px-8">Learn More</Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container py-20">
        <h2 className="text-4xl font-bold mb-12 text-center">Why ProjectMatch?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Smart Matching</CardTitle>
              <CardDescription>AI-powered matching based on skills and goals</CardDescription>
            </CardHeader>
            <CardContent>
              Our intelligent algorithm connects you with the most compatible collaborators for your project.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Verified Profiles</CardTitle>
              <CardDescription>Build trust with detailed skill verification</CardDescription>
            </CardHeader>
            <CardContent>
              Showcase your skills and experience with verified profiles and project portfolio.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Collaboration Tools</CardTitle>
              <CardDescription>Everything you need to work together</CardDescription>
            </CardHeader>
            <CardContent>
              Integrated messaging, project management, and collaboration features built-in.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-20 text-center">
        <h2 className="text-3xl font-bold mb-8">Ready to Find Your Perfect Match?</h2>
        <Link href="/auth/register">
          <Button size="lg" className="px-12">Create Your Profile Today</Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-20">
        <div className="container py-8 text-center text-muted-foreground">
          <p>&copy; 2026 ProjectMatch. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
