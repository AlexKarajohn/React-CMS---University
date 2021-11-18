import Dashboard from "../../components/authorized/dashboard/Dashboard";
import TermsAndConditions from "../../components/unauthorized/termsAndConditions/TermsAndConditions";
import Profile from "../../components/authorized/profile/Profile";
import Facilities from "../../components/authorized/facilities/Facilities";
import PasswordRecovery from "../../components/unauthorized/passwordRecovery/PasswordRecovery";
import PasswordChange from "../../components/unauthorized/passwordChange/PasswordChange";
import AccountActivation from "../../components/unauthorized/signup/AccountActivation";
import Login from "../../components/unauthorized/login/Login";
import SignUp from "../../components/unauthorized/signup/SignUp";
import Home from "../../components/unauthorized/home/Home";
import Facility from "../../components/authorized/facilities/facility/Facility";
import Alerts from "../../components/authorized/alerts/Alerts";
//---------------- ICONS -----------------
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import DescriptionIcon from '@mui/icons-material/Description';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import PersonIcon from '@mui/icons-material/Person';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';



const routes = [
    
    {
        title: 'Home',
        path: '/',
        component: Home,
        authorization : false,
        icon:HomeIcon
    },
    {
        title: 'Login',
        path: '/auth/login',
        component: Login,
        authorization : false,
        icon: LoginIcon,
    },
    {
        title: 'Sign Up',
        path: '/auth/signup',
        component: SignUp,
        authorization : false,
        icon : PersonAddIcon
    },
    {
        title: 'Account Activation',
        path: '/auth/accountActivation/:token',
        component: AccountActivation,
        authorization : false,
    },
    {
        title: 'Password Recovery',
        path: '/auth/passwordRecovery',
        component: PasswordRecovery,
        authorization : false,
        icon: LockOpenIcon
    },
    {
        title: 'Password Change',
        path: '/auth/passwordChange/:resetToken',
        component: PasswordChange,
        authorization : false,
    },
    {
        title: 'Profile',
        path: '/auth/profile',
        component: Profile,
        authorization : true,
        icon: PersonIcon
    },
    {
        title: 'Dashboard',
        path: '/auth/dashboard',
        component: Dashboard,
        authorization : true,
        icon: DashboardIcon
    },
    {
        title: 'Facilities',
        path: '/auth/facilities',
        component: Facilities,
        authorization : true,
        icon: HomeWorkIcon
    },
    {
        title: 'Alerts',
        path: '/auth/alerts',
        component: Alerts,
        authorization : true,
        icon: NotificationImportantIcon
    },
    {
        title: 'Facility',
        path: '/auth/facilities/:facilityId',
        component: Facility,
        authorization : true,
    },
    {
        title: 'Terms And Conditions',
        path: '/termsAndConditions',
        component: TermsAndConditions,
        authorization : false,
        universal : true,
        icon: DescriptionIcon
    },
]

export default routes;