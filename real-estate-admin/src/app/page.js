// import Home_V5 from "./(home)/home-v5/page";
import Login from "./(pages)/login/page";
import Wrapper from "./layout-wrapper/wrapper";

export const metadata = {
  title: "Login - Real Estate",
};

export default function MainRoot() {
  return (
    <Wrapper>
      <Login />
    </Wrapper>
  );
}
