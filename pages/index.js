export default function index() {
  return <div>Hello world!</div>;
}

export async function getServerSideProps(ctx) {
  return {
    redirect: {
      destination: "/login",
      permanent: false,
    },
  };
}
