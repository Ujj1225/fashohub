import HomeScreenTopMen from "../../components/homescreen/HomeScreenTopMen";
import HomeScreenTopWomen from "../../components/homescreen/HomeScreenTopWomen";
import HomeScreenTopKids from "../../components/homescreen/HomeScreenTopKids";
import HomeScreenBanner from "../../components/homescreen/HomeScreenBanner";
import Footer from "../../components/Footer";


export default function HomeScreen() {
  return (
    <div className="border-t">
      <HomeScreenBanner />
      <div className="p-12 flex flex-col gap-y-8 sm:p-2">
        <HomeScreenTopMen />
        <HomeScreenTopWomen />
        <HomeScreenTopKids />
      </div>
      <Footer />
    </div>
  );
}
