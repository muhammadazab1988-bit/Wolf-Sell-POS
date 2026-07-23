// ضيف الدالة دي في آخر ملف src/lib/strapi.ts (تحت loginUser بالظبط)

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
  return data.data; // array فيها كل المنتجات
}