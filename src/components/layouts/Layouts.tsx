import { routes } from "@/constants/routes";
import Navbar from "../navbars/Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar  routes={Object.values(routes)}/>
      <main>{children}</main>
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
