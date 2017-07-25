import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import App from './pages/App';
import appState from './appState';
// import './assets/App.css';

// Static Pages
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import Advisor from './pages/Advisor';
import WavePreSignup from './pages/WavePreSignup';
import Challenge from './pages/Challenge';
import GirlsWhoFund from './pages/GirlsWhoFund';
import Hashtag from './pages/Hashtag';
import EmailCapture from './pages/EmailCapturePage';
import Page404 from './pages/Page404';

// Sign Up
import Step1 from './signup/Step1';
import StudentStep2 from './signup/StudentStep2';
import StudentStep3 from './signup/StudentStep3';
import StudentConfirmation from './signup/StudentConfirmation';
import ProStep2 from './signup/ProStep2';
import ProStep3 from './signup/ProStep3';
import ProConfirmation from './signup/ProConfirmation';
import Login from './signup/Login';
import StudentUnder15 from './signup/StudentUnder15';
import StudentOver18 from './signup/StudentOver18';

// Advisor Platform
import WaveDashboard from './wave/WaveDashboard';
import S1Overview from './wave/S1Overview';
import S1Guide1 from './wave/S1Guide1';
import S1Guide2 from './wave/S1Guide2';
import S1Guide3 from './wave/S1Guide3';
import S1Guide4 from './wave/S1Guide4';
import S1Guide5 from './wave/S1Guide5';
import S1Survey from './wave/S1Survey';
import S2Overview from './wave/S2Overview';
import S2Guide1 from './wave/S2Guide1';
import S2Guide2 from './wave/S2Guide2';
import S2Guide3 from './wave/S2Guide3';
import S2Guide4 from './wave/S2Guide4';
import S2Survey from './wave/S2Survey';
import S3Survey from './wave/S3Survey';
import S3Wrap from './wave/S3Wrap';

import BackEndDevOverview from './wave/BackEndDevOverview';
import BackEndDev1 from './wave/BackEndDev1';
import BackEndDev2 from './wave/BackEndDev2';
import BackEndDev3 from './wave/BackEndDev3';

import FrontEndDevOverview from './wave/FrontEndDevOverview';
import FrontEndDev1 from './wave/FrontEndDev1';
import FrontEndDev2 from './wave/FrontEndDev2';
import FrontEndDev3 from './wave/FrontEndDev3';

import BusinessModelOverview from './wave/BusinessModelOverview';
import BusinessModel1 from './wave/BusinessModel1';
import BusinessModel2 from './wave/BusinessModel2';
import BusinessModel3 from './wave/BusinessModel3';

import MediaContentOverview from './wave/MediaContentOverview';
import MediaContent1 from './wave/MediaContent1';
import MediaContent2 from './wave/MediaContent2';
import MediaContent3 from './wave/MediaContent3';

import StorytellingBrandOverview from './wave/StorytellingBrandOverview';
import StorytellingBrand1 from './wave/StorytellingBrand1';
import StorytellingBrand2 from './wave/StorytellingBrand2';
import StorytellingBrand3 from './wave/StorytellingBrand3';

import GrowthLeversOverview from './wave/GrowthLeversOverview';
import GrowthLevers1 from './wave/GrowthLevers1';
import GrowthLevers2 from './wave/GrowthLevers2';
import GrowthLevers3 from './wave/GrowthLevers3';

import HardwareOverview from './wave/HardwareOverview';
import Hardware1 from './wave/Hardware1';
import Hardware2 from './wave/Hardware2';
import Hardware3 from './wave/Hardware3';

import ProductManagementOverview from './wave/ProductManagementOverview';
import ProductManagement1 from './wave/ProductManagement1';
import ProductManagement2 from './wave/ProductManagement2';
import ProductManagement3 from './wave/ProductManagement3';

import BusinessOperationsOverview from './wave/BusinessOperationsOverview';
import BusinessOperations1 from './wave/BusinessOperations1';
import BusinessOperations2 from './wave/BusinessOperations2';
import BusinessOperations3 from './wave/BusinessOperations3';

import UXUIOverview from './wave/UXUIOverview';
import UXUI1 from './wave/UXUI1';
import UXUI2 from './wave/UXUI2';
import UXUI3 from './wave/UXUI3';

import QAOverview from './wave/QAOverview';
import QA1 from './wave/QA1';
import QA2 from './wave/QA2';
import QA3 from './wave/QA3';

import Resources from './wave/Resources';
import Resource1 from './wave/Resource1';
import Resource2 from './wave/Resource2';
import Resource3 from './wave/Resource3';
import Resource4 from './wave/Resource4';


// Profile
import Profile from './profile/Profile';
import Settings from './signup/Settings';
import ChangeLogin from './signup/ChangeLogin';
import PasswordReset from './signup/PasswordReset';

import AdminUsers from './admin/AdminUsers';
import AdminCalendar from './admin/AdminCalendar';
import AdminProfileCalendar from './admin/calendarUserProfile';
import AdminIntercomImport from './admin/AdminIntercomImport';
import AdminSurveyExport from './admin/AdminSurveyExport';

// const Program = ({ params }) => <div>Program: {params.id}</div>;

const Signup = ({ children }) => <div>{children}</div>;
const SignupPro = ({ children }) => <div>{children}</div>;
const SignupStudent = ({ children }) => <div>{children}</div>;

// const Advisor = ({ children }) => <div>{children}</div>;

let pageMeta = { /* browser title, page header */
  '/about': { title: 'About', header: 'About' },
  '/programs': { title: 'Programs', header: 'Programs' },
  '/wave/login': { title: 'Login', header: 'Login' },
  '/wave': { title: 'Wave', header: 'Wave' },
  default: { title: 'Welcome!', header: 'Welcome!' },
};

function updateTitle() {
  let path = window.location.pathname;
  console.log("*******path: ", path);

  if (!pageMeta[path]) {
    // try to find a similar path that has a title and use it
    for (path in pageMeta) {
      if (window.location.pathname.indexOf(path) === 0) {
        break;
      }
    }

    if (!pageMeta[path]) { path = 'default'; }
  }

  appState.pageTitle = pageMeta[path].title;
  document.getElementsByTagName('title')[0].innerText =  '#BUILTBYGIRLS :: ' + pageMeta[path].header;

  window.Intercom('update');
}

ReactDOM.render(
	<Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory}>
		<Route path='/' component={App}>
			<IndexRoute component={Home} />

      <Route path='/wave/presignup' component={WavePreSignup}  onEnter={updateTitle} />
      <Route path='/wave/lt15' component={StudentUnder15}  onEnter={updateTitle} />
      <Route path='/wave/gt18' component={StudentOver18}  onEnter={updateTitle} />
			<Route path='/wave/signup' component={Signup} onEnter={updateTitle}>
				<IndexRoute component={Step1} />

				<Route path='professional' component={SignupPro} onEnter={updateTitle}>
					<Route path='2' component={ProStep2} onEnter={updateTitle} />
					<Route path='3' component={ProStep3} onEnter={updateTitle} />
          <Route path='confirmation' component={ProConfirmation} onEnter={updateTitle} />
				</Route>
				<Route path='student' component={SignupStudent} onEnter={updateTitle}>
					<Route path='2' component={StudentStep2} onEnter={updateTitle} />
					<Route path='3' component={StudentStep3} onEnter={updateTitle} />
          <Route path='confirmation' component={StudentConfirmation} onEnter={updateTitle} />
				</Route>
			</Route>

      <Route path='/wave' component={WaveDashboard}  onEnter={updateTitle} />
      <Route path='/wave/session/1' component={S1Overview}  onEnter={updateTitle} />
      <Route path='/wave/session/1/1' component={S1Guide1}  onEnter={updateTitle} />
      <Route path='/wave/session/1/2' component={S1Guide2}  onEnter={updateTitle} />
      <Route path='/wave/session/1/3' component={S1Guide3}  onEnter={updateTitle} />
      <Route path='/wave/session/1/4' component={S1Guide4}  onEnter={updateTitle} />
      <Route path='/wave/session/1/5' component={S1Guide5}  onEnter={updateTitle} />
      <Route path='/wave/session/1/survey' component={S1Survey}  onEnter={updateTitle} />
      <Route path='/wave/session/2' component={S2Overview}  onEnter={updateTitle} />
      <Route path='/wave/session/2/1' component={S2Guide1}  onEnter={updateTitle} />
      <Route path='/wave/session/2/2' component={S2Guide2}  onEnter={updateTitle} />
      <Route path='/wave/session/2/3' component={S2Guide3}  onEnter={updateTitle} />
      <Route path='/wave/session/2/4' component={S2Guide4}  onEnter={updateTitle} />
      <Route path='/wave/session/2/survey' component={S2Survey}  onEnter={updateTitle} />

      <Route path='/wave/session/3/survey' component={S3Survey}  onEnter={updateTitle} />

      <Route path='/wave/session/back-end-dev' component={BackEndDevOverview} onEnter={updateTitle} />
      <Route path='/wave/session/back-end-dev/1' component={BackEndDev1}  onEnter={updateTitle} />
      <Route path='/wave/session/back-end-dev/2' component={BackEndDev2}  onEnter={updateTitle} />
      <Route path='/wave/session/back-end-dev/3' component={BackEndDev3}  onEnter={updateTitle} />
      <Route path='/wave/session/back-end-dev/4' component={S3Wrap}  onEnter={updateTitle} />

      <Route path='/wave/session/front-end-dev' component={FrontEndDevOverview} onEnter={updateTitle} />
      <Route path='/wave/session/front-end-dev/1' component={FrontEndDev1}  onEnter={updateTitle} />
      <Route path='/wave/session/front-end-dev/2' component={FrontEndDev2}  onEnter={updateTitle} />
      <Route path='/wave/session/front-end-dev/3' component={FrontEndDev3}  onEnter={updateTitle} />
      <Route path='/wave/session/front-end-dev/4' component={S3Wrap}  onEnter={updateTitle} />

      <Route path='/wave/session/business-model' component={BusinessModelOverview} onEnter={updateTitle} />
      <Route path='/wave/session/business-model/1' component={BusinessModel1}  onEnter={updateTitle} />
      <Route path='/wave/session/business-model/2' component={BusinessModel2}  onEnter={updateTitle} />
      <Route path='/wave/session/business-model/3' component={BusinessModel3}  onEnter={updateTitle} />
      <Route path='/wave/session/business-model/4' component={S3Wrap}  onEnter={updateTitle} />

      <Route path='/wave/session/media-content' component={MediaContentOverview} onEnter={updateTitle} />
      <Route path='/wave/session/media-content/1' component={MediaContent1}  onEnter={updateTitle} />
      <Route path='/wave/session/media-content/2' component={MediaContent2}  onEnter={updateTitle} />
      <Route path='/wave/session/media-content/3' component={MediaContent3}  onEnter={updateTitle} />
      <Route path='/wave/session/media-content/4' component={S3Wrap}  onEnter={updateTitle} />

      <Route path='/wave/session/storytelling-brand' component={StorytellingBrandOverview} onEnter={updateTitle} />
      <Route path='/wave/session/storytelling-brand/1' component={StorytellingBrand1}  onEnter={updateTitle} />
      <Route path='/wave/session/storytelling-brand/2' component={StorytellingBrand2}  onEnter={updateTitle} />
      <Route path='/wave/session/storytelling-brand/3' component={StorytellingBrand3}  onEnter={updateTitle} />
      <Route path='/wave/session/storytelling-brand/4' component={S3Wrap}  onEnter={updateTitle} />

      <Route path='/wave/session/growth-levers' component={GrowthLeversOverview} onEnter={updateTitle} />
      <Route path='/wave/session/growth-levers/1' component={GrowthLevers1}  onEnter={updateTitle} />
      <Route path='/wave/session/growth-levers/2' component={GrowthLevers2}  onEnter={updateTitle} />
      <Route path='/wave/session/growth-levers/3' component={GrowthLevers3}  onEnter={updateTitle} />
      <Route path='/wave/session/growth-levers/4' component={S3Wrap}  onEnter={updateTitle} />

      <Route path='/wave/session/hardware' component={HardwareOverview} onEnter={updateTitle} />
      <Route path='/wave/session/hardware/1' component={Hardware1}  onEnter={updateTitle} />
      <Route path='/wave/session/hardware/2' component={Hardware2}  onEnter={updateTitle} />
      <Route path='/wave/session/hardware/3' component={Hardware3}  onEnter={updateTitle} />
      <Route path='/wave/session/hardware/4' component={S3Wrap}  onEnter={updateTitle} />

      <Route path='/wave/session/product-management' component={ProductManagementOverview} onEnter={updateTitle} />
      <Route path='/wave/session/product-management/1' component={ProductManagement1}  onEnter={updateTitle} />
      <Route path='/wave/session/product-management/2' component={ProductManagement2}  onEnter={updateTitle} />
      <Route path='/wave/session/product-management/3' component={ProductManagement3}  onEnter={updateTitle} />
      <Route path='/wave/session/product-management/4' component={S3Wrap}  onEnter={updateTitle} />

      <Route path='/wave/session/business-operations' component={BusinessOperationsOverview} onEnter={updateTitle} />
      <Route path='/wave/session/business-operations/1' component={BusinessOperations1}  onEnter={updateTitle} />
      <Route path='/wave/session/business-operations/2' component={BusinessOperations2}  onEnter={updateTitle} />
      <Route path='/wave/session/business-operations/3' component={BusinessOperations3}  onEnter={updateTitle} />
      <Route path='/wave/session/business-operations/4' component={S3Wrap}  onEnter={updateTitle} />

      <Route path='/wave/session/ux-ui' component={UXUIOverview} onEnter={updateTitle} />
      <Route path='/wave/session/ux-ui/1' component={UXUI1}  onEnter={updateTitle} />
      <Route path='/wave/session/ux-ui/2' component={UXUI2}  onEnter={updateTitle} />
      <Route path='/wave/session/ux-ui/3' component={UXUI3}  onEnter={updateTitle} />
      <Route path='/wave/session/ux-ui/4' component={S3Wrap}  onEnter={updateTitle} />

      <Route path='/wave/session/qa' component={QAOverview} onEnter={updateTitle} />
      <Route path='/wave/session/qa/1' component={QA1}  onEnter={updateTitle} />
      <Route path='/wave/session/qa/2' component={QA2}  onEnter={updateTitle} />
      <Route path='/wave/session/qa/3' component={QA3}  onEnter={updateTitle} />
      <Route path='/wave/session/qa/4' component={S3Wrap}  onEnter={updateTitle} />

      <Route path='wave/login' component={Login}  onEnter={updateTitle} />
      <Route path='/profile/:id' component={Profile}  onEnter={updateTitle} />
      <Route path='/settings' component={Settings}  onEnter={updateTitle} />
      <Route path='/changelogin' component={ChangeLogin}  onEnter={updateTitle} />
      <Route path='/wave/resources' component={Resources}  onEnter={updateTitle} />
      <Route path='/wave/resources/1' component={Resource1}  onEnter={updateTitle} />
      <Route path='/wave/resources/2' component={Resource2}  onEnter={updateTitle} />
      <Route path='/wave/resources/3' component={Resource3}  onEnter={updateTitle} />
      <Route path='/wave/resources/4' component={Resource4}  onEnter={updateTitle} />

			<Route path='/about' component={About}  onEnter={updateTitle} />
			<Route path='/programs' component={Programs} onEnter={updateTitle} />
			<Route path='/programs/wave' component={Advisor}  onEnter={updateTitle} />
      <Route path='/programs/challenge' component={Challenge}  onEnter={updateTitle} />
      <Route path='/programs/girlswhofund' component={GirlsWhoFund}  onEnter={updateTitle} />
      <Route path='/programs/hashtag' component={Hashtag}  onEnter={updateTitle} />
      <Route path='/signup' component={EmailCapture}  onEnter={updateTitle} />
      <Route path='/resetpassword' component={PasswordReset}  onEnter={updateTitle} />

      <Route path='/admin/users' component={AdminUsers}  onEnter={updateTitle} />
      <Route path='/admin/calendar' component={AdminCalendar}  onEnter={updateTitle} />
      <Route path='/admin/calendar/:id' component={AdminProfileCalendar}  onEnter={updateTitle} />
      <Route path='/admin/intercomimport' component={AdminIntercomImport}  onEnter={updateTitle} />
      <Route path='/admin/surveyexport' component={AdminSurveyExport}  onEnter={updateTitle} />




			{/*	<Route path='/programs/:id' component={Program} />*/}
			<Route path='*' component={Page404} onEnter={updateTitle} />

		</Route>
	</Router>,
	document.getElementById('root')
);
