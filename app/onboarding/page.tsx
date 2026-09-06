'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { completeOnboarding, getAllSkills } from '@/actions/profile';
import { useSession } from 'next-auth/react';

interface Skill {
  id: string;
  name: string;
  category: string;
}

export default function OnboardingPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    userType: '',
    goal: '',
    availability: '',
    experienceLevel: '',
  });
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSkills = async () => {
      const fetchedSkills = await getAllSkills();
      setSkills(fetchedSkills);
    };
    loadSkills();
  }, []);

  const handleSubmit = async () => {
    if (!session?.user?.email) {
      setError('User not authenticated');
      return;
    }

    if (selectedSkills.length === 0) {
      setError('Please select at least one skill');
      return;
    }

    setIsLoading(true);
    try {
      // Note: In a real app, you'd need to get the userId from the session
      // For now, we'll assume it's available in the session
      // const result = await completeOnboarding(session.user.id, {
      //   ...formData,
      //   skillIds: selectedSkills,
      // });

      // if (!result.success) {
      //   setError(result.error || 'Failed to complete onboarding');
      //   return;
      // }

      router.push('/dashboard');
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSkill = (skillId: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skillId)
        ? prev.filter((id) => id !== skillId)
        : [...prev, skillId]
    );
  };

  const canProceed = () => {
    if (step === 1) {
      return (
        formData.userType &&
        formData.goal &&
        formData.availability &&
        formData.experienceLevel
      );
    }
    return selectedSkills.length > 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-card py-12">
      <div className="container max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>
              {step === 1 ? 'Tell us about yourself' : 'Select your skills'}
            </CardTitle>
            <CardDescription>
              Step {step} of 2 - Help us find the perfect matches for you
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="p-3 bg-red-900/20 border border-red-700 rounded-md text-red-200 text-sm mb-4">
                {error}
              </div>
            )}

            {step === 1 ? (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">I am a...</label>
                  <div className="flex gap-2 flex-wrap">
                    {['Developer', 'Designer', 'Founder', 'Marketer', 'Other'].map(
                      (type) => (
                        <Button
                          key={type}
                          variant={
                            formData.userType === type ? 'default' : 'outline'
                          }
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              userType: type,
                            }))
                          }
                        >
                          {type}
                        </Button>
                      }
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">My goal is to...</label>
                  <div className="flex gap-2 flex-wrap">
                    {[
                      'Build a startup',
                      'Find a co-founder',
                      'Join a team',
                      'Collaborate',
                    ].map((goal) => (
                      <Button
                        key={goal}
                        variant={formData.goal === goal ? 'default' : 'outline'}
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            goal,
                          }))
                        }
                      >
                        {goal}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    My availability is...
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {['Full-time', 'Part-time', 'Weekends'].map((availability) => (
                      <Button
                        key={availability}
                        variant={
                          formData.availability === availability
                            ? 'default'
                            : 'outline'
                        }
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            availability,
                          }))
                        }
                      >
                        {availability}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    My experience level is...
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {['Beginner', 'Intermediate', 'Advanced', 'Expert'].map(
                      (level) => (
                        <Button
                          key={level}
                          variant={
                            formData.experienceLevel === level
                              ? 'default'
                              : 'outline'
                          }
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              experienceLevel: level,
                            }))
                          }
                        >
                          {level}
                        </Button>
                      )
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <p className="text-sm text-muted-foreground">
                  Select the skills that match your expertise:
                </p>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Badge
                      key={skill.id}
                      variant={selectedSkills.includes(skill.id) ? 'default' : 'outline'}
                      className="cursor-pointer"
                      onClick={() => toggleSkill(skill.id)}
                    >
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-4 mt-8">
              {step > 1 && (
                <Button
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                  disabled={isLoading}
                >
                  Back
                </Button>
              )}
              {step < 2 ? (
                <Button
                  onClick={() => setStep(step + 1)}
                  disabled={!canProceed()}
                  className="flex-1"
                >
                  Continue
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!canProceed() || isLoading}
                  className="flex-1"
                >
                  {isLoading ? 'Completing...' : 'Complete Setup'}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
