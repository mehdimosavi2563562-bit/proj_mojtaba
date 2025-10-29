import React, { useState, useMemo } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { PRODUCTS } from '../constants';
import { Product } from '../types';
import { XMarkIcon } from './Icons';

interface RecommenderModalProps {
  onClose: () => void;
}

interface Recommendation {
  product: Product;
  reason: string;
}

const AI_MODEL = 'gemini-2.5-flash';
const COOKING_OPTIONS = ["Beef", "Chicken", "Pork", "Veggies", "Seafood"];
const FLAVOR_OPTIONS = ["Smoky", "Spicy", "Savory", "Sweet", "Herby"];
const INTENSITY_OPTIONS = ["Mild", "Bold", "Extra Bold"];

const RecommenderModal: React.FC<RecommenderModalProps> = ({ onClose }) => {
  const [cookingType, setCookingType] = useState<string | null>(null);
  const [flavorProfile, setFlavorProfile] = useState<string | null>(null);
  const [intensity, setIntensity] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [step, setStep] = useState(1);

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

  const isFormComplete = useMemo(() => {
    return cookingType && flavorProfile && intensity;
  }, [cookingType, flavorProfile, intensity]);

  const handleGetRecommendation = async () => {
    if (!isFormComplete) return;
    setIsLoading(true);
    setError(null);
    setRecommendations([]);

    const productList = PRODUCTS.map(({ id, name, tagline }) => ({ id, name, tagline }));

    const prompt = `You are a flavor expert for Kinder's Seasonings. A customer is cooking ${cookingType}, prefers a ${flavorProfile} and ${intensity} flavor profile. Based on the following list of available products, recommend the top 3 best matches. For each recommendation, provide a short, enticing reason (max 20 words) why it's a good fit.
Available products: ${JSON.stringify(productList)}
Respond ONLY with a valid JSON object.`;

    try {
      const response = await ai.models.generateContent({
        model: AI_MODEL,
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              recommendations: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.INTEGER },
                    reason: { type: Type.STRING },
                  },
                  required: ["id", "reason"],
                },
              },
            },
            required: ["recommendations"],
          },
        },
      });

      const resultJson = JSON.parse(response.text);
      const recommendedProducts = resultJson.recommendations.map((rec: { id: number; reason: string }) => {
        const product = PRODUCTS.find(p => p.id === rec.id);
        return product ? { product, reason: rec.reason } : null;
      }).filter((p: Recommendation | null): p is Recommendation => p !== null);
      
      setRecommendations(recommendedProducts);
      setStep(2);

    } catch (e) {
      console.error(e);
      setError("Sorry, we couldn't find a recommendation right now. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetQuiz = () => {
    setCookingType(null);
    setFlavorProfile(null);
    setIntensity(null);
    setRecommendations([]);
    setError(null);
    setStep(1);
  };

  const renderQuiz = () => (
    <>
      <h2 className="text-2xl md:text-3xl font-bold text-center text-kinders-dark">Find Your Perfect Flavor</h2>
      <p className="text-center text-kinders-gray mt-2 mb-8">Answer a few questions to get a personalized recommendation.</p>
      
      <div className="space-y-6">
        <QuizSection title="What are you cooking?" options={COOKING_OPTIONS} selected={cookingType} setSelected={setCookingType} />
        <QuizSection title="What's your preferred flavor profile?" options={FLAVOR_OPTIONS} selected={flavorProfile} setSelected={setFlavorProfile} />
        <QuizSection title="How adventurous are you feeling?" options={INTENSITY_OPTIONS} selected={intensity} setSelected={setIntensity} />
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={handleGetRecommendation}
          disabled={!isFormComplete || isLoading}
          className="bg-kinders-red text-white font-bold py-3 px-12 rounded-full hover:bg-red-700 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed w-full sm:w-auto"
        >
          {isLoading ? 'Finding Flavor...' : 'Get Recommendation'}
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </>
  );

  const renderResults = () => (
     <>
      <h2 className="text-2xl md:text-3xl font-bold text-center text-kinders-dark">Your Flavor Matches!</h2>
      <p className="text-center text-kinders-gray mt-2 mb-8">Based on your choices, we think you'll love these:</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recommendations.map(({ product, reason }) => (
          <div key={product.id} className="text-center p-4 border rounded-lg bg-white">
            <img src={product.imageUrl} alt={product.name} className="w-full h-auto object-cover mb-4 rounded"/>
            <h3 className="text-lg font-bold text-kinders-dark">{product.name}</h3>
            <p className="text-sm text-kinders-gray italic mt-2">"{reason}"</p>
          </div>
        ))}
      </div>
       <div className="mt-8 text-center">
        <button
          onClick={resetQuiz}
          className="bg-kinders-dark text-white font-bold py-3 px-12 rounded-full hover:bg-gray-800 transition-colors duration-300 w-full sm:w-auto"
        >
          Start Over
        </button>
      </div>
    </>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 animate-fade-in" onClick={onClose}>
      <div className="bg-kinders-light-gray rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 md:p-8 relative animate-slide-up" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-kinders-red transition-colors">
          <XMarkIcon className="w-8 h-8"/>
        </button>
        {step === 1 ? renderQuiz() : renderResults()}
      </div>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        .animate-slide-up { animation: slide-up 0.4s ease-out forwards; }
      `}</style>
    </div>
  );
};

interface QuizSectionProps {
    title: string;
    options: string[];
    selected: string | null;
    setSelected: (option: string) => void;
}

const QuizSection: React.FC<QuizSectionProps> = ({ title, options, selected, setSelected }) => (
    <div>
        <h3 className="text-lg font-semibold text-kinders-dark mb-3 text-center">{title}</h3>
        <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {options.map(option => (
                <button
                    key={option}
                    onClick={() => setSelected(option)}
                    className={`font-semibold py-2 px-4 rounded-full border-2 transition-all duration-200 text-sm md:text-base
                        ${selected === option 
                            ? 'bg-kinders-red border-kinders-red text-white' 
                            : 'bg-white border-gray-300 text-kinders-gray hover:border-kinders-red hover:text-kinders-red'
                        }`}
                >
                    {option}
                </button>
            ))}
        </div>
    </div>
)


export default RecommenderModal;
