export const SelectTravelslist =[
    {
        id:1,
        title:'just me',
        desc:'A sole travels in explorations',
        icon: 'plane',
        people: '1'
    },
    {
        id:2,
        title:'couple',
        desc:'two travels in tandem',
        icon: 'daru',
        people: '2 people'
    },
    {
        id:3,
        title:'family',
        desc:'A group of family',
        icon: 'plane',
        people: '4-5'
    },
    {
        id:4,
        title:'friends',
        desc:'A group of yappers',
        icon: 'plane',
        people: '4-5'
    },
]

export const StatDetails=[
    { number: "1000+", label: "Trips Planned" },
    { number: "50+", label: "Countries" },
    { number: "4.9/5", label: "User Rating" },
    { number: "24/7", label: "AI Support" },
  ];

export const SelectBudget=[
    {
        id:1,
        type:"cheap",
        desc:"Stay conscious of costs",


    },
    {
        id: 2,
        type:"Moderate",
        desc:"Keep costs on the average side",
        
    },
    {
        id :3,
        type:"Luxury",
        desc:"Don't worry about cost"
    }
]

export const Ai_Prompt="Generate Travel  plan for location: {destination} , for {totalDays}, for {traveler} with  a {budget} budget , give me a hotels options list with Hotel Name , Hotel address , price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with place Name, place Details, place image url, geo coordinates, rating, ticket pricing, rating, time travel each of location for 3 days with each day plan with best to visit and estimate the total cost of trip in JSON format."