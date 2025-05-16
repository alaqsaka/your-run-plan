'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroupItem, RadioGroup } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { storeFormDataAndGeneratePlan } from '../submit-form/actions/submitForm';
import { useState } from 'react';
import { toast } from 'sonner';
import { Loader } from 'lucide-react';


const formSchema = z.object({
  goal: z.string(),
  fitnessLevel: z.string(),
  daysPerWeek: z.string(),
  timePerRun: z.string(),
  injuries: z.string().optional(),
  environment: z.string(),
  pace: z.string(),
  motivations: z.array(z.string()),
  nutrition: z.string(),
  additionalInfo: z.string().optional(),

  // New Fields
  raceDate: z.string().optional(), // Optional, only if relevant
  prefersCrossTraining: z.boolean().optional(),
  crossTrainingActivities: z.array(z.string()).optional(),
  sleepQuality: z.string().optional(),
  recoveryTools: z.array(z.string()).optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function FormPage() {
  const [loading, setLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      motivations: [],
      crossTrainingActivities: [],
      recoveryTools: [],
    },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const response = await storeFormDataAndGeneratePlan(data);
      console.log('Form data stored successfully:', response);
      toast.success('Form submitted successfully!');
      form.reset(); // Optional: clear form
    } catch (error) {
      console.error('Error storing form data:', error);
      toast.error('There was an error submitting the form.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Get Your Personalized Running Plan</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="goal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What is your primary running goal?</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your primary running goal" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="5K">5K</SelectItem>
                  <SelectItem value="10K">10K</SelectItem>
                  <SelectItem value="Half Marathon">Half Marathon</SelectItem>
                  <SelectItem value="Marathon">Marathon</SelectItem>
                  <SelectItem value="General Fitness">General Fitness</SelectItem>
                  <SelectItem value="Weight Loss">Weight Loss</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

          <FormField
            control={form.control}
            name="fitnessLevel"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>How would you describe your current fitness level?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Beginner" />
                      </FormControl>
                      <FormLabel className="font-normal">Beginner</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Intermediate" />
                      </FormControl>
                      <FormLabel className="font-normal">Intermediate</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Advanced" />
                      </FormControl>
                      <FormLabel className="font-normal">Advanced</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          <FormField
            control={form.control}
            name="daysPerWeek"
            render={({ field }) => (
              <FormItem>
                <FormLabel>How many days per week can you commit to running?</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select days per week" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[...Array(7)].map((_, i) => (
                      <SelectItem key={i + 1} value={(i + 1).toString()}>
                        {i + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="timePerRun"
            render={({ field }) => (
              <FormItem>
                <FormLabel>How much time (in minutes) do you have for each run?</FormLabel>
                <Input type="number" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />


          <FormField
            control={form.control}
            name="injuries"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Do you have any current or past injuries or health issues?</FormLabel>
                <Textarea {...field} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="environment"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>What type of running environment do you prefer?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Road" />
                      </FormControl>
                      <FormLabel className="font-normal">Road</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Trail" />
                      </FormControl>
                      <FormLabel className="font-normal">Trail</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Treadmill" />
                      </FormControl>
                      <FormLabel className="font-normal">Treadmill</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Mixed" />
                      </FormControl>
                      <FormLabel className="font-normal">Mixed</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          <FormField
            control={form.control}
            name="pace"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What is your typical running pace or speed?</FormLabel>
                <Input placeholder="e.g., 6:30/km or 9 mph" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="motivations"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What motivates you to run?</FormLabel>
                <div className="flex flex-wrap gap-4">
                  {["Competition", "Weight Loss", "Stress Relief", "Social", "Fun", "Health", "Other"].map((motivation) => {
                    const isChecked = field.value.includes(motivation);
                    return (
                      <FormItem
                        key={motivation}
                        className="flex items-center space-x-2 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={isChecked}
                            onCheckedChange={(checked) => {
                              const newValue = checked
                                ? [...field.value, motivation]
                                : field.value.filter((v) => v !== motivation);
                              field.onChange(newValue);
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">{motivation}</FormLabel>
                      </FormItem>
                    );
                  })}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nutrition"
            render={({ field }) => (
              <FormItem>
                <FormLabel>How would you describe your current nutrition habits?</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your nutrition habit" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Balanced">Balanced</SelectItem>
                    <SelectItem value="High Carb">High Carb</SelectItem>
                    <SelectItem value="Low Carb">Low Carb</SelectItem>
                    <SelectItem value="Vegetarian">Vegetarian</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="additionalInfo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Any additional information or preferences youd like to share?</FormLabel>
                <Textarea {...field} />
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Race Planning */}
          <FormField
            control={form.control}
            name="raceDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Do you have a target race date?</FormLabel>
                <Input type="date" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Cross-Training Preference */}
          <FormField
            control={form.control}
            name="prefersCrossTraining"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-3">
                <FormControl>
                  <Checkbox
                    checked={!!field.value}
                    onCheckedChange={(checked) => field.onChange(checked)}
                  />
                </FormControl>
                <FormLabel className="font-normal">
                  Do you want to include cross-training in your plan?
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Cross-Training Activities */}
          <FormField
            control={form.control}
            name="crossTrainingActivities"
            render={({ field }) => (
              <FormItem>
                <FormLabel>If yes, what types of cross-training do you enjoy?</FormLabel>
                <div className="flex flex-wrap gap-4">
                  {["Cycling", "Swimming", "Yoga", "Strength Training", "HIIT", "Other"].map((activity) => {
                    const isChecked = field.value?.includes(activity);
                    return (
                      <FormItem
                        key={activity}
                        className="flex items-center space-x-2 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={isChecked}
                            onCheckedChange={(checked) => {
                              const newValue = checked
                                ? [...(field.value || []), activity]
                                : (field.value || []).filter((v) => v !== activity);
                              field.onChange(newValue);
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">{activity}</FormLabel>
                      </FormItem>
                    );
                  })}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Recovery Tools */}
          <FormField
            control={form.control}
            name="recoveryTools"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Which recovery tools or methods do you use?</FormLabel>
                <div className="flex flex-wrap gap-4">
                  {["Foam Roller", "Massage", "Stretching", "Ice Bath", "None", "Other"].map((tool) => {
                    const isChecked = field.value?.includes(tool);
                    return (
                      <FormItem
                        key={tool}
                        className="flex items-center space-x-2 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={isChecked}
                            onCheckedChange={(checked) => {
                              const newValue = checked
                                ? [...(field.value || []), tool]
                                : (field.value || []).filter((v) => v !== tool);
                              field.onChange(newValue);
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">{tool}</FormLabel>
                      </FormItem>
                    );
                  })}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Sleep Quality */}
          <FormField
            control={form.control}
            name="sleepQuality"
            render={({ field }) => (
              <FormItem>
                <FormLabel>How would you rate your sleep quality?</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select sleep quality" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Excellent">Excellent</SelectItem>
                    <SelectItem value="Good">Good</SelectItem>
                    <SelectItem value="Fair">Fair</SelectItem>
                    <SelectItem value="Poor">Poor</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="mt-6">
            {loading ? <Loader className="mr-2 animate-spin" /> : null} Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
