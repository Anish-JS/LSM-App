import { SignIn, UserButton, useUser } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <UserButton />
    </div>
  );
}
