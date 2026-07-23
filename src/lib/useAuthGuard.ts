"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// دالة بسيطة: بتتأكد إن فيه مستخدم مسجل دخول قبل ما تعرض الصفحة
export function useAuthGuard() {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [hasUser, setHasUser] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    // (تأكد إن الكلمة دي مكتوبة بحرف "ل" صغير: localStorage مش LocalStorage)
    setHasUser(!!user);
    setChecked(true);
  }, []);

  useEffect(() => {
    if (checked && !hasUser) {
      router.push("/");
    }
  }, [checked, hasUser, router]);

  return checked && hasUser;
}