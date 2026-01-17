
import React from 'react';
import LoginForm from './components/LoginForm';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Main Content Container */}
      <main className="flex-grow flex items-center justify-center pt-5 pb-10 sm:pt-20 sm:pb-28">
        <div className="w-full max-w-[980px] px-4 flex flex-col lg:flex-row items-center lg:items-start lg:justify-between space-y-10 lg:space-y-0">
          
          {/* Left Branding Section */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start lg:pr-12 text-center lg:text-left mt-0 lg:mt-10">
            <h1 className="text-[#1877f2] text-5xl sm:text-6xl font-bold tracking-tighter mb-4">
              facebook
            </h1>
            <p className="text-xl sm:text-2xl font-normal leading-tight text-gray-800 lg:max-w-[500px]">
              Facebook helps you connect and share with the people in your life.
            </p>
          </div>

          {/* Right Login Section */}
          <div className="w-full lg:w-[400px] flex flex-col">
            <LoginForm />
            <div className="mt-7 text-center">
              <p className="text-sm">
                <a href="#" className="font-bold hover:underline">Create a Page</a> for a celebrity, brand or business.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
