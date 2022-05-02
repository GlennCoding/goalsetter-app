import { UserIcon } from "@heroicons/react/outline";
import axios, { AxiosError } from "axios";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Goal, GoalsDTO } from "../utils/types";

const DashboardPage: NextPage = () => {
  const [token] = useAuth();
  const router = useRouter();
  const [goals, setGoals] = useState<Goal[]>();

  useEffect(() => {
    axios
      .get<GoalsDTO>("http://localhost:8000/api/goals", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setGoals(res.data);
      })
      .catch((e: AxiosError) => {
        if (e.response?.status === 400) router.push("/");
      });
  }, []);

  useEffect(() => {
    if (!token) router.push("/");
  }, [token]);

  return (
    <>
      <div className="min-h-full">
        <div className="bg-indigo-600 pb-32">
          <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
            <div className="relative h-16 flex items-center justify-between lg:border-b lg:border-indigo-400 lg:border-opacity-25">
              <div className="px-2 flex items-center lg:px-0">
                <div className="flex-shrink-0">
                  <Link href="/">
                    <img
                      className="block h-8 w-8 cursor-pointer"
                      src="https://tailwindui.com/img/logos/workflow-mark-indigo-300.svg"
                      alt="Workflow"
                    />
                  </Link>
                </div>
              </div>
              <div className="w-8 h-8 flex items-center justify-center bg-white rounded-full">
                <UserIcon className="w-5 h-5 text-indigo-600" />
              </div>
            </div>
          </div>

          <header className="py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold text-white">Goals</h1>
            </div>
          </header>
        </div>

        <main className="-mt-32">
          <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
            {goals && goals.map((goal) => <div>{goal.text}</div>)}
          </div>
        </main>
      </div>
    </>
  );
};
export default DashboardPage;
