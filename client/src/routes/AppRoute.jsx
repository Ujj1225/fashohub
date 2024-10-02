import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const UserLayout = React.lazy(() => import("./UserLayout"));
const HomeScreen = React.lazy(() => import("../screens/user/HomeScreen"));
const SignUpScreen = React.lazy(() => import("../screens/user/SignUpScreen"));
const LoginScreen = React.lazy(() => import("../screens/user/LoginScreen"));
const VerifyScreen = React.lazy(() => import("../screens/user/VerifyScreen"));
const AddressScreen = React.lazy(() => import("../screens/user/AddressScreen"));
const PrimaryCategoriesScreen = React.lazy(() =>
  import("../screens/user/PrimaryCategoriesScreen")
);
const SecondaryCategoryScreen = React.lazy(() =>
  import("../screens/user/SecondaryCategoryScreen")
);
const TertiaryCategoryScreen = React.lazy(() =>
  import("../screens/user/TertiaryCategoryScreen")
);
const AdminHomeScreen = React.lazy(() =>
  import("../screens/admin/AdminHomeScreen")
);
const VendorEditProductScreen = React.lazy(() =>
  import("../screens/vendor/VendorEditProductScreen")
);
const VendorHomeScreen = React.lazy(() =>
  import("../screens/vendor/VendorHomeScreen")
);
const VendorInformation = React.lazy(() =>
  import("../screens/vendor/VendorInformation")
);
const VendorProducts = React.lazy(() =>
  import("../screens/vendor/VendorProducts")
);
const VendorCreateProduct = React.lazy(() =>
  import("../screens/vendor/VendorCreateProduct")
);
const VendorOrders = React.lazy(() => import("../screens/vendor/VendorOrders"));
const DeliveryPartnerHomeScreen = React.lazy(() =>
  import("../screens/deliveryPartner/DeliveryPartnerHomeScreen")
);
const PrivateLayout = React.lazy(() => import("./PrivateLayout"));
const AdminLayout = React.lazy(() => import("./AdminLayout"));
const VendorLayout = React.lazy(() => import("./VendorLayout"));
const DeliveryPartnerLayout = React.lazy(() =>
  import("./DeliveryPartnerLayout")
);
const ProfileScreen = React.lazy(() => import("../screens/user/ProfileScreen"));
const ProductScreen = React.lazy(() => import("../screens/user/ProductScreen"));
const WishlistScreen = React.lazy(() =>
  import("../screens/user/WishlistScreen")
);
const BagScreen = React.lazy(() => import("../screens/user/BagScreen"));
const SavedAddressScreen = React.lazy(() =>
  import("../screens/user/SavedAddressScreen")
);
const PaymentScreen = React.lazy(() => import("../screens/user/PaymentScreen"));
const UserOrders = React.lazy(() => import("../components/UserOrders"));
const AllReviewsScreen = React.lazy(() =>
  import("../screens/user/AllReviewsScreen")
);
const OrderScreen = React.lazy(() => import("../screens/user/OrderScreen"));
const AdminManageOrders = React.lazy(() =>
  import("../screens/admin/AdminManageOrders")
);
const AdminManageUsers = React.lazy(() =>
  import("../screens/admin/AdminManageUsers")
);
const AdminManageProducts = React.lazy(() =>
  import("../screens/admin/AdminManageProducts")
);
const AdminEditUser = React.lazy(() =>
  import("../screens/admin/AdminEditUser")
);
const VendorRequestScreen = React.lazy(() =>
  import("../screens/user/VendorRequestScreen")
);
const AdminVendorRequests = React.lazy(() =>
  import("../screens/admin/AdminVendorRequests")
);
const AdminViewRequest = React.lazy(() =>
  import("../screens/admin/AdminViewRequest")
);
const AdminOrderAssignment = React.lazy(() =>
  import("../screens/admin/AdminOrderAssignment")
);
const DeliveryPartnerAssignedOrders = React.lazy(() =>
  import("../screens/deliveryPartner/DeliveryPartnerAssignedOrders")
);
const AdminBannerScreen = React.lazy(() =>
  import("../screens/admin/AdminBannerScreen")
);
const Footer = React.lazy(() => import("../components/Footer"));

const AppRoute = () => {
  return (
    <Router>
      <Suspense
        fallback={
          <p className="text-center font-bold text-gray-500 mt-20">
            Loading...
          </p>
        }
      >
        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route index element={<HomeScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/signup" element={<SignUpScreen />} />
            <Route path="/verify" element={<VerifyScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/:primary" element={<PrimaryCategoriesScreen />} />
            <Route path="/footer" element={<Footer />} />
            <Route
              path="/:primary/:secondary"
              element={<SecondaryCategoryScreen />}
            />
            <Route
              path="/:primary/:secondary/:tertiary"
              element={<TertiaryCategoryScreen />}
            />
            <Route
              path="/product/:pid/all-reviews"
              element={<AllReviewsScreen />}
            />
            {/* private routes */}
            <Route path="" element={<PrivateLayout />}>
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="/wishlist" element={<WishlistScreen />} />
              <Route path="/bag" element={<BagScreen />} />
              <Route path="/address" element={<AddressScreen />} />
              <Route path="/myaddress" element={<SavedAddressScreen />} />
              <Route path="/payment" element={<PaymentScreen />} />
              <Route path="/myorders" element={<UserOrders />} />
              <Route path="/order/:oid" element={<OrderScreen />} />
              <Route
                path="/:uid/vendor-request"
                element={<VendorRequestScreen />}
              />
            </Route>
          </Route>

          {/* admin routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminHomeScreen />} />
            <Route path="/admin/manage-users" element={<AdminManageUsers />} />
            <Route
              path="/admin/manage-orders"
              element={<AdminManageOrders />}
            />
            <Route
              path="/admin/manage-products"
              element={<AdminManageProducts />}
            />
            <Route path="/admin/user/:uid/edit" element={<AdminEditUser />} />
            <Route
              path="/admin/vendor-requests"
              element={<AdminVendorRequests />}
            />
            <Route
              path="/admin/request/:rid/edit"
              element={<AdminViewRequest />}
            />
            <Route
              path="/admin/order-assignment/:oid"
              element={<AdminOrderAssignment />}
            />
            <Route
              path="/admin/manage-banner"
              element={<AdminBannerScreen />}
            />
          </Route>

          {/* vendor routes */}
          <Route path="/vendor" element={<VendorLayout />}>
            <Route index element={<VendorHomeScreen />} />
            <Route
              path="/vendor/update-your-information"
              element={<VendorInformation />}
            />
            <Route
              path="/vendor/create-product"
              element={<VendorCreateProduct />}
            />
            <Route path="/vendor/your-products" element={<VendorProducts />} />
            <Route path="/vendor/my-orders" element={<VendorOrders />} />
            <Route
              path="/vendor/product/:id/edit"
              element={<VendorEditProductScreen />}
            />
          </Route>

          {/* delivery partner routes */}
          <Route path="/delivery-partner" element={<DeliveryPartnerLayout />}>
            <Route index element={<DeliveryPartnerHomeScreen />} />
            <Route
              path="/delivery-partner/assigned-orders"
              element={<DeliveryPartnerAssignedOrders />}
            />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRoute;
