"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Leaf } from "lucide-react";

export default function ClientNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <Link href="/" className="inline-flex items-center gap-2 mb-8">
          <Leaf className="h-10 w-10 sm:h-12 sm:w-12 text-green-600" />
          <span className="text-2xl sm:text-3xl font-bold text-green-800">
            Minty
          </span>
        </Link>

        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-green-800 mb-4">
            404 - Page Not Found
          </h1>
          <p className="text-xl text-green-700 mb-8">
            Oops! Looks like this financial leaf has fallen off our money tree.
          </p>
        </motion.div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5, type: "spring" }}
          className="mb-8"
        >
          <svg
            className="w-48 h-48 mx-auto"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              d="M100 20C55.8172 20 20 55.8172 20 100C20 144.183 55.8172 180 100 180C144.183 180 180 144.183 180 100C180 55.8172 144.183 20 100 20Z"
              fill="#E2F5E9"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            <motion.path
              d="M100 20C55.8172 20 20 55.8172 20 100C20 144.183 55.8172 180 100 180C144.183 180 180 144.183 180 100C180 55.8172 144.183 20 100 20Z"
              stroke="#22C55E"
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            <motion.path
              d="M100 60C100 60 60 100 100 140C140 100 100 60 100 60Z"
              fill="#22C55E"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, duration: 1, type: "spring" }}
            />
            <motion.path
              d="M100 80V140"
              stroke="#E2F5E9"
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 2, duration: 1 }}
            />
          </svg>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Link href="/" passHref>
            <motion.div
              className="inline-block bg-green-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-green-700 transition duration-300 ease-in-out"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Return to Your Money Tree
            </motion.div>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
