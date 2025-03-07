"use client";

import { Avatar, AvatarImage } from "../ui/avatar";

export default function AvatarUser({ url }) {
  return (
    <Avatar className="h-8 w-8 border-2 rounded-full">
      <AvatarImage src={url} alt={"Avatar"} />
    </Avatar>
  );
}
