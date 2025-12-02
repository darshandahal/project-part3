'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function NutritionalInsights() {
  const { data: session } = useSession();
  const [dietType, setDietType] = useState('All Diet Types');
  const [twoFACode, setTwoFACode] = useState('');

  const handleGetNutritionButton = () => {
    console.log('Get Nutritional Insights clicked');
  };

  const handleGetRecipes = () => {
    console.log('Get Recipes clicked');
  };

  const handleGetClusters = () => {
    console.log('Get Clusters clicked');
  };

  const handleCleanupResources = () => {
    console.log('Clean Up Resources clicked');
  };

  const handleLoginGoogle = async () => {
    await signIn('google');
  };

  const handleLoginGitHub = async () => {
    await signIn('github');
  };

  const handle2FASubmit = () => {
    console.log('2FA Code submitted:', twoFACode);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl sm:text-3xl font-bold">Nutritional Insights</h1>
          {session && session.user ? (
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-semibold">{session.user.name}</p>
                <p className="text-sm text-blue-100">{session.user.email}</p>
              </div>
              <button
                onClick={() => signOut()}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
              >
                Sign Out
              </button>
            </div>
          ) : null}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Explore Nutritional Insights Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Explore Nutritional Insights</h2>
          
          {/* Charts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Bar Chart */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold mb-2 text-gray-800">Bar Chart</h3>
              <p className="text-gray-700 text-sm mb-4">Average macronutrient content by diet type.</p>
              <div className="relative w-full h-64">
                <Image
                  src="/bar.png"
                  alt="Bar Chart"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Scatter Plot */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold mb-2 text-gray-800">Scatter Plot</h3>
              <p className="text-gray-700 text-sm mb-4">Nutrient relationships (e.g., protein vs carbs).</p>
              <div className="relative w-full h-64">
                <Image
                  src="/scatter.png"
                  alt="Scatter Plot"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Heatmap */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold mb-2 text-gray-800">Heatmap</h3>
              <p className="text-gray-700 text-sm mb-4">Nutrient correlations.</p>
              <div className="relative w-full h-64">
                <Image
                  src="/heatmap.png"
                  alt="Heatmap"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Pie Chart */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold mb-2 text-gray-800">Pie Chart</h3>
              <p className="text-gray-700 text-sm mb-4">Recipe distribution by diet type.</p>
              <div className="relative w-full h-64">
                <Image
                  src="/piechart.png"
                  alt="Pie Chart"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Filters and Data Interaction Section */}
        <section className="mb-12 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Filters and Data Interaction</h2>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <input
              type="text"
              placeholder="Search by Diet Type"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={dietType}
              onChange={(e) => setDietType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>All Diet Types</option>
              <option>Vegan</option>
              <option>Vegetarian</option>
              <option>Keto</option>
              <option>Paleo</option>
              <option>Mediterranean</option>
            </select>
          </div>

          {/* API Data Interaction */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-800">API Data Interaction</h3>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleGetNutritionButton}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
              >
                Get Nutritional Insights
              </button>
              <button
                onClick={handleGetRecipes}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
              >
                Get Recipes
              </button>
              <button
                onClick={handleGetClusters}
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
              >
                Get Clusters
              </button>
            </div>
          </div>
        </section>

        {/* Security & Compliance Section */}
        <section className="mb-12 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Security & Compliance</h2>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-bold mb-3 text-gray-800">Security Status</h3>
            <div className="space-y-2">
              <p><span className="font-semibold text-gray-800">Encryption:</span> <span className="text-green-600 font-semibold">Enabled</span></p>
              <p><span className="font-semibold text-gray-800">Access Control:</span> <span className="text-green-600 font-semibold">Secure</span></p>
              <p><span className="font-semibold text-gray-800">Compliance:</span> <span className="text-green-600 font-semibold">GDPR Compliant</span></p>
            </div>
          </div>
        </section>

        {/* OAuth & 2FA Integration Section */}
        <section className="mb-12 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-6 text-gray-800">OAuth & 2FA Integration</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold mb-4 text-gray-800">Secure Login</h3>
              {!session || !session.user ? (
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleLoginGoogle}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
                  >
                    Login with Google
                  </button>
                  <button
                    onClick={handleLoginGitHub}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
                  >
                    Login with GitHub
                  </button>
                </div>
              ) : (
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <p className="text-green-700 font-semibold mb-2">✓ Logged in as:</p>
                  <p className="text-gray-800"><strong>Name:</strong> {session.user.name}</p>
                  <p className="text-gray-800"><strong>Email:</strong> {session.user.email}</p>
                  <button
                    onClick={() => signOut()}
                    className="mt-3 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-800">Enter 2FA Code</label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  placeholder="Enter your 2FA code"
                  value={twoFACode}
                  onChange={(e) => setTwoFACode(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handle2FASubmit}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Cloud Resource Cleanup Section */}
        <section className="mb-12 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Cloud Resource Cleanup</h2>
          
          <p className="text-gray-700 mb-4">
            Ensure that cloud resources are efficiently managed and cleaned up post-deployment.
          </p>
          <button
            onClick={handleCleanupResources}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
          >
            Clean Up Resources
          </button>
        </section>

        {/* Pagination Section */}
        <section className="flex justify-center mb-12">
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition duration-200">
              Previous
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold">
              1
            </button>
            <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition duration-200">
              2
            </button>
            <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition duration-200">
              Next
            </button>
          </div>
        </section>
      </div>

      {/* Footer */}
      <div className="bg-blue-600 text-white text-center py-4 px-4">
        <p>© 2025 Nutritional Insights. All Rights Reserved.</p>
      </div>
    </div>
  );
}