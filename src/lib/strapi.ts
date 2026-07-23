const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export async function loginUser(identifier: string, password: string) {
  const res = await fetch(`${STRAPI_URL}/api/auth/local`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identifier, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error?.message || "فشل تسجيل الدخول");
  }

  const meRes = await fetch(`${STRAPI_URL}/api/users/me?populate=role`, {
    headers: {
      Authorization: `Bearer ${data.jwt}`,
    },
  });
  const userWithRole = await meRes.json();

  return {
    jwt: data.jwt,
    user: userWithRole,
  };
}

export async function getProducts() {
  const token = localStorage.getItem("jwt");

  const res = await fetch(`${STRAPI_URL}/api/products?populate=*`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("فشل جلب المنتجات");
  }

  const data = await res.json();
  return data.data;
}
