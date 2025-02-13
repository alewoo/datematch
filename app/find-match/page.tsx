"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { Heart } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const GEORGIA_UNIVERSITIES = [
  "Georgia Institute of Technology",
  "Emory University",
  "University of Georgia",
  "Georgia State University",
  "Other",
] as const;

export default function FindMatch() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    seeking: "",
    university: "",
    email: "",
    instagram: "",
    interests: "",
    idealDate: "",
  });
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const age = parseInt(formData.age);
    if (age < 18) {
      alert("You must be 18 or older to use this service.");
      return;
    }

    try {
      const profile = searchParams.get("profile");
      const submissionData = {
        ...formData,
        personalityProfile: profile
          ? JSON.parse(decodeURIComponent(profile))
          : null,
        submittedAt: new Date().toISOString(),
      };

      const response = await fetch("/api/submit-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      setShowConfirmation(true);

      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (error) {
      console.error("Error:", error);
      alert("There was an error submitting your profile. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-red-100 to-purple-100 py-12 px-4">
      {/* Logo */}
      <motion.div
        className="absolute top-4 left-4 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Link href="/" className="flex items-center space-x-2">
          <Heart className="text-pink-500 h-6 w-6" />
          <span className="font-bold text-xl bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text">
            DateMatch
          </span>
        </Link>
      </motion.div>

      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8"
        >
          <h1 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 text-center">
            Find Your Perfect Match
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Meet amazing people for you!
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <Input
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full"
                placeholder="Your name"
              />
              <p className="text-sm text-gray-500 mt-1">
                This is how you'll appear to potential matches
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Age</label>
              <Input
                required
                type="number"
                min="18"
                max="100"
                value={formData.age}
                onChange={(e) =>
                  setFormData({ ...formData, age: e.target.value })
                }
                className="w-full"
                placeholder="Your age (must be 18+)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Gender</label>
              <Select
                required
                value={formData.gender}
                onValueChange={(value) =>
                  setFormData({ ...formData, gender: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select your gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="non-binary">Non-binary</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Seeking</label>
              <Select
                required
                value={formData.seeking}
                onValueChange={(value) =>
                  setFormData({ ...formData, seeking: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select gender you're seeking" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="non-binary">Non-binary</SelectItem>
                  <SelectItem value="any">Any</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                University
              </label>
              <Select
                required
                value={formData.university}
                onValueChange={(value) =>
                  setFormData({ ...formData, university: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select your university" />
                </SelectTrigger>
                <SelectContent>
                  {GEORGIA_UNIVERSITIES.map((uni) => (
                    <SelectItem key={uni} value={uni}>
                      {uni}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input
                required
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full"
                placeholder="your.email@university.edu"
              />
              <p className="text-sm text-gray-500 mt-1">
                We'll use this to notify you about matches
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Instagram (Optional)
              </label>
              <Input
                value={formData.instagram}
                onChange={(e) =>
                  setFormData({ ...formData, instagram: e.target.value })
                }
                className="w-full"
                placeholder="@yourusername"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Interests
              </label>
              <Textarea
                required
                value={formData.interests}
                onChange={(e) =>
                  setFormData({ ...formData, interests: e.target.value })
                }
                className="w-full h-32"
                placeholder="Tell us about your hobbies and interests..."
              />
              <p className="text-sm text-gray-500 mt-1">
                What do you like to do for fun?
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Ideal Date
              </label>
              <Textarea
                required
                value={formData.idealDate}
                onChange={(e) =>
                  setFormData({ ...formData, idealDate: e.target.value })
                }
                className="w-full h-32"
                placeholder="Describe your perfect date..."
              />
              <p className="text-sm text-gray-500 mt-1">
                What would be your dream date?
              </p>
            </div>

            <style jsx global>{`
              .select-trigger {
                border-color: #ec4899 !important;
              }
              .select-trigger:focus {
                ring-color: #ec4899 !important;
              }
              input:focus,
              textarea:focus {
                border-color: #ec4899 !important;
                ring-color: #ec4899 !important;
              }
            `}</style>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-4 px-8 rounded-full text-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:from-pink-600 hover:to-purple-700"
            >
              Find My Match
              <Heart className="ml-2 h-5 w-5 animate-pulse" />
            </Button>
          </form>
        </motion.div>
      </div>

      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="bg-white/95 backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text">
              Profile Submitted! 💝
            </DialogTitle>
          </DialogHeader>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 text-center space-y-4"
          >
            <p className="text-lg text-gray-700">
              Thanks for submitting your profile! We're excited to help you find
              your perfect match.
            </p>
            <p className="text-gray-600">
              We'll be in touch soon with potential matches that align with your
              personality and preferences.
            </p>
            <div className="flex justify-center pt-4">
              <Heart className="text-pink-500 h-8 w-8 animate-pulse" />
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
