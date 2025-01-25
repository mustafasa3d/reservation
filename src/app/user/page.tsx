import Header from "@/components/Header";

async function page() {
  return <>
   <Header
        title={`User`}
        btnInfo={{ href: "/", text: "aaa" }}
      />
  <div>user</div>
  </>;
}

export default page;
