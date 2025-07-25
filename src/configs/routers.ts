import SCAN from '../pages/scan.jsx';
import SHOP from '../pages/shop.jsx';
import HOME from '../pages/home.jsx';
import PROFILE from '../pages/profile.jsx';
import TICKET from '../pages/ticket.jsx';
import COUNTER from '../pages/counter.jsx';
import MANUAL from '../pages/manual.jsx';
import ORDER_SCAN from '../pages/order-scan.jsx';
import TICKET_SCAN from '../pages/ticket-scan.jsx';
import ACTIVITY_DETAIL from '../pages/activity-detail.jsx';
import STAFF_PROFILE from '../pages/staff-profile.jsx';
import EVENT_CONFIRMATION from '../pages/event-confirmation.jsx';
import INVENTORY from '../pages/inventory.jsx';
export const routers = [{
  id: "scan",
  component: SCAN
}, {
  id: "shop",
  component: SHOP
}, {
  id: "home",
  component: HOME
}, {
  id: "profile",
  component: PROFILE
}, {
  id: "ticket",
  component: TICKET
}, {
  id: "counter",
  component: COUNTER
}, {
  id: "manual",
  component: MANUAL
}, {
  id: "order-scan",
  component: ORDER_SCAN
}, {
  id: "ticket-scan",
  component: TICKET_SCAN
}, {
  id: "activity-detail",
  component: ACTIVITY_DETAIL
}, {
  id: "staff-profile",
  component: STAFF_PROFILE
}, {
  id: "event-confirmation",
  component: EVENT_CONFIRMATION
}, {
  id: "inventory",
  component: INVENTORY
}]