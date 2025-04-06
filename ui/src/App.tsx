import { useState } from "react";
import { ConversionComponent } from "./component/conversion.component";

function App() {
  const [conversionActive, setConversionActive] = useState(false);

  return (
    <div className="bg-gradient-to-r from-blue-500 to-teal-500 min-h-screen">

      {/* Full-Page Landing Section */}
      <div className="flex flex-col items-center justify-center text-center text-white px-6 py-12 bg-black bg-opacity-50 min-h-screen">
        <h1 className="text-5xl font-semibold mb-4 animate__animated animate__fadeIn">
          Welcome to Our Dental Practice
        </h1>
        <p className="text-xl mb-6 animate__animated animate__fadeIn">
          Need a checkup or cleaning? Book your appointment with our easy-to-use chatbot.
        </p>
        <p className="text-md mb-6 animate__animated animate__fadeIn">
          Fast, efficient, and convenient dental care right at your fingertips.
        </p>
        <button
          onClick={() => setConversionActive(true)}
          className="py-3 px-8 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Start Booking
        </button>
      </div>

      {/* FAQ Section */}
      <section className="bg-white py-12 px-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-semibold text-gray-800">Frequently Asked Questions</h2>
          <div className="mt-6 space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium text-gray-700">What should I bring for my first appointment?</h3>
              <p className="text-gray-600">Please bring a valid ID, your insurance card (if applicable), and any relevant medical records.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium text-gray-700">How do I cancel or reschedule my appointment?</h3>
              <p className="text-gray-600">You can cancel or reschedule your appointment directly through our chatbot or by calling our office.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium text-gray-700">Do you accept insurance?</h3>
              <p className="text-gray-600">We accept most major dental insurance plans. You can also inquire about self-pay or financing options for non-insured patients.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium text-gray-700">What if I need an emergency appointment?</h3>
              <p className="text-gray-600">If you have a dental emergency, our chatbot will immediately notify the staff to assist you in getting an urgent appointment.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Steps for Booking Section */}
      <section className="bg-teal-50 py-12 px-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-semibold text-gray-800">Steps for Booking Your Appointment</h2>
          <p className="text-lg text-gray-600 mt-4">Follow these simple steps to book your appointment with us:</p>
          <div className="mt-8 space-y-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-semibold">1</div>
              <div>
                <h3 className="text-lg font-medium text-gray-800">Start a Chat</h3>
                <p className="text-gray-600">Click on the "Start Booking" button to open the chatbot and begin your appointment scheduling process.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-semibold">2</div>
              <div>
                <h3 className="text-lg font-medium text-gray-800">Provide Your Details</h3>
                <p className="text-gray-600">Enter your full name, contact information, and insurance details (if applicable). This will help us prepare for your visit.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-semibold">3</div>
              <div>
                <h3 className="text-lg font-medium text-gray-800">Choose a Time Slot</h3>
                <p className="text-gray-600">Select an available time slot that works best for you. If none of the slots fit, the chatbot will suggest alternatives.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-semibold">4</div>
              <div>
                <h3 className="text-lg font-medium text-gray-800">Confirm Your Appointment</h3>
                <p className="text-gray-600">Once your time is selected, confirm your booking. You’ll receive a reminder for your appointment date.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chatbot Floating Button */}
      <button
        onClick={() => setConversionActive((prev) => !prev)}
        className="fixed bottom-4 right-4 inline-flex items-center justify-center text-sm font-medium disabled:pointer-events-none disabled:opacity-50 border rounded-full w-16 h-16 bg-black hover:bg-gray-700 m-0 cursor-pointer border-gray-200 bg-none p-0 normal-case leading-5 hover:text-gray-900"
        type="button" aria-haspopup="dialog" aria-expanded="false" data-state="closed"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="40" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className="text-white block border-gray-200 align-middle">
          <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" className="border-gray-200"></path>
        </svg>
      </button>

      {/* ConversionComponent (Chatbot) */}
      {conversionActive && <ConversionComponent />}
    </div>
  );
}

export default App;