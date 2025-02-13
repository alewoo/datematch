import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { sendConfirmationEmail } from "@/lib/email";
// import { UserProfile } from "@/app/data/types";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Insert the profile into Supabase
    const { data: profile, error } = await supabase
      .from("profiles")
      .insert([
        {
          name: data.name,
          age: parseInt(data.age),
          gender: data.gender,
          seeking: data.seeking,
          university: data.university,
          email: data.email,
          instagram: data.instagram,
          interests: data.interests,
          ideal_date: data.idealDate,
          personality_profile: data.personalityProfile,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    // Send confirmation email
    await sendConfirmationEmail(data.email);

    return NextResponse.json({ success: true, profile });
  } catch (error) {
    console.error("Error submitting profile:", error);
    return NextResponse.json(
      { error: "Failed to submit profile" },
      { status: 500 }
    );
  }
}
