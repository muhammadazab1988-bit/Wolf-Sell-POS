"use client";

import Image from "next/image";
import wolfImage from "./images/wolf.jpeg";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";

export default function LoginPage() {
const register = (values: { email: string; password: string }) => {
  console.log(values);
  router.push("/cashier");
};
  const router = useRouter();

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-amber-50 rounded-2xl sm:px-6 lg:px-8">
      <Formik onSubmit={register} initialValues={{ email: "", password: "" }}>
        <Form className="flex w-full max-w-md flex-col items-center justify-start gap-4 rounded-[2rem] border border-amber-200 bg-amber-50 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.16)] sm:gap-5 sm:p-6 md:p-8">
          <h1 className="text-3xl font-bold text-amber-600 sm:text-4xl">
            WOLF Sell
          </h1>
          <Image
            className="h-24 w-24 rounded-[1.5rem] object-cover sm:h-28 sm:w-28 -rotate-z-12 hover:hover-3d"
            src={wolfImage}
            alt="Wolf Sell"
            width={150}
            height={150}
          />
          <div className="text-center">
            <h2 className="text-xl font-bold text-black sm:text-2xl">
              Welcome Back
            </h2>
            <p className="mt-1 text-sm text-black/80 sm:text-base">
              Enter Your Credentials To Access Your POS
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:gap-4">
            <label className="text-sm font-semibold text-black sm:text-base">
              Email Address
            </label>
            <Field
              type="email"
              name="email"
              autoComplete="email"
              required
              className="h-12 w-full rounded-2xl border border-amber-200 bg-white px-4 text-sm font-semibold shadow-sm outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-200 sm:h-14 sm:text-base"
              placeholder="name@company.com"
            />
            <div className="mt-1 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-sm font-semibold text-black sm:text-base">
                Password
              </span>
              <span className="text-sm font-bold text-amber-600 underline-offset-2 hover:underline">
                Forget Password?
              </span>
            </div>
            <Field
              type="password"
              name="password"
              className="h-12 w-full rounded-2xl border border-amber-200 bg-white px-4 text-sm shadow-sm outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-200 sm:h-14 sm:text-base"
              placeholder="............"
            />
          </div>
          <label className="flex w-full items-center gap-2 text-sm text-black sm:text-base">
            <input
              type="checkbox"
              name="remember"
              className="h-4 w-4 accent-amber-600"
            />
            <span>Keep me signed in</span>
          </label>
          <button
            className="h-12 w-full rounded-2xl bg-amber-600 px-4 font-semibold text-white transition hover:bg-amber-700 sm:h-14"
            type="submit"
          >
            Sign In to Dashboard
          </button>
        </Form>
      </Formik>
    </div>
  );
}
