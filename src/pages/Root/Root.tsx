import { Outlet } from "react-router-dom";

import Header from "@components/Header";

import "./Root.scss";

const RootLayout = () => {
  // const navigation = useNavigation();
  return (
    <div className="rootWrapper">
      <Header />
      <main className="rootBody">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
