'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { updateProfile, getUserSkills, getAllSkills, addUserSkill, removeUserSkill } from '@/actions/profile';

export default function ProfilePage() {
  const { data: session } = useSession();
  const [profile, setProfile] = useState({
    bio: '',
    availability: 'Part-time',
    experienceLevel: 'Intermediate',
  });
  const [skills, setSkills] = useState([]);
  const [allSkills, setAllSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      if (!session?.user?.email) return;
      
      const [userSkills, allSkillsData] = await Promise.all([
        getUserSkills(session.user.email),
        getAllSkills(),
      ]);
      
      setSkills(userSkills);
      setAllSkills(allSkillsData);
    };
    
    loadData();
  }, [session]);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // In a real app, you'd pass the actual userId
      // const result = await updateProfile(userId, profile);
      // if (result.success) {
      //   setSuccess(true);
      // } else {
      //   setError(result.error);
      // }
      setSuccess(true);
    } catch (err) {
      setError('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-card">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <Link href="/dashboard" className="text-2xl font-bold text-accent">
            ProjectMatch
          </Link>
          <div className="text-sm text-muted-foreground">{session?.user?.name}</div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b border-border bg-card/50">
        <div className="container flex gap-8 h-14 items-center">
          <Link
            href="/dashboard"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Explore
          </Link>
          <Link
            href="/profile"
            className="text-sm font-medium text-accent border-b-2 border-accent pb-4 flex items-center h-full"
          >
            Profile
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Avatar
                    src={session?.user?.image || undefined}
                    fallback={session?.user?.name?.charAt(0).toUpperCase()}
                  />
                </div>
                <CardTitle>{session?.user?.name}</CardTitle>
                <CardDescription>{session?.user?.email}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full">Edit Avatar</Button>
                <Button variant="outline" className="w-full">
                  Share Profile
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Profile Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              {/* About Tab */}
              <TabsContent value="about" className="space-y-4 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">About You</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleProfileUpdate} className="space-y-4">
                      {error && (
                        <div className="p-3 bg-red-900/20 border border-red-700 rounded-md text-red-200 text-sm">
                          {error}
                        </div>
                      )}
                      {success && (
                        <div className="p-3 bg-green-900/20 border border-green-700 rounded-md text-green-200 text-sm">
                          Profile updated successfully!
                        </div>
                      )}

                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          placeholder="Tell others about yourself..."
                          value={profile.bio}
                          onChange={(e) =>
                            setProfile((prev) => ({
                              ...prev,
                              bio: e.target.value,
                            }))
                          }
                          disabled={isLoading}
                          className="min-h-[120px]"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="availability">Availability</Label>
                        <select
                          id="availability"
                          value={profile.availability}
                          onChange={(e) =>
                            setProfile((prev) => ({
                              ...prev,
                              availability: e.target.value,
                            }))
                          }
                          disabled={isLoading}
                          className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm"
                        >
                          <option>Full-time</option>
                          <option>Part-time</option>
                          <option>Weekends</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="experience">Experience Level</Label>
                        <select
                          id="experience"
                          value={profile.experienceLevel}
                          onChange={(e) =>
                            setProfile((prev) => ({
                              ...prev,
                              experienceLevel: e.target.value,
                            }))
                          }
                          disabled={isLoading}
                          className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm"
                        >
                          <option>Beginner</option>
                          <option>Intermediate</option>
                          <option>Advanced</option>
                          <option>Expert</option>
                        </select>
                      </div>

                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? 'Saving...' : 'Save Changes'}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Skills Tab */}
              <TabsContent value="skills" className="space-y-4 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Your Skills</CardTitle>
                    <CardDescription>Add or remove skills from your profile</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-3">Current Skills</p>
                      <div className="flex flex-wrap gap-2">
                        {skills.length > 0 ? (
                          skills.map((skill: any) => (
                            <Badge key={skill.id} className="cursor-pointer">
                              {skill.skill?.name}
                              <button
                                onClick={() => removeUserSkill(session?.user?.email || '', skill.skillId)}
                                className="ml-2 text-xs"
                              >
                                ×
                              </button>
                            </Badge>
                          ))
                        ) : (
                          <p className="text-sm text-muted-foreground">No skills added yet</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-3">Available Skills</p>
                      <div className="flex flex-wrap gap-2">
                        {allSkills.map((skill: any) => (
                          <Badge
                            key={skill.id}
                            variant="outline"
                            className="cursor-pointer hover:bg-accent/20"
                            onClick={() =>
                              addUserSkill(
                                session?.user?.email || '',
                                skill.id,
                                'INTERMEDIATE'
                              )
                            }
                          >
                            + {skill.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="space-y-4 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Privacy Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="public">Make profile public</Label>
                      <input type="checkbox" id="public" className="w-4 h-4" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="notifications">Email notifications</Label>
                      <input type="checkbox" id="notifications" className="w-4 h-4" defaultChecked />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}
