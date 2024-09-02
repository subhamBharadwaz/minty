"use client";

import {
  useConvexAuth,
  useQuery,
  Authenticated,
  Unauthenticated,
  useMutation,
} from "convex/react";
import { api } from "../../convex/_generated/api";
import Link from "next/link";

export default function Home() {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const createTask = useMutation(api.tasks.create);
  const tasks = useQuery(api.tasks.get);
  return (
    <div>
      <Authenticated>
        <button
          onClick={() => {
            createTask({ text: "Hey", isCompleted: false });
          }}
        >
          Click me
        </button>

        {tasks?.map((task) => <div key={task._id}>{task.text}</div>)}
      </Authenticated>
      <Unauthenticated>
        <Link href="/sign-in">Sign in</Link>
      </Unauthenticated>
    </div>
  );
}
