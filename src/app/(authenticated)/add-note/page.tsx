import React from "react";
import Markdown from "react-markdown";

const page = () => {
  const markdown = `*Trains: A Revolution in Transportation*

  * *Introduction:* Trains have played a pivotal role in shaping the modern world, transforming the way people and goods move across distances. Their ability to carry heavy loads efficiently and reliably has had profound economic and social impacts. 
  
  * *Historical Development*
      * *Early Origins:* Primitive forms of railways existed in ancient times, but steam-powered locomotives in the early 19th century marked a true revolution.
      * *Rapid Expansion:* Railroad networks spread quickly across industrialized nations, fueling trade, urbanization, and the movement of populations.
  
  * *Types of Trains*
      * *Passenger Trains:* Designed for transporting people, ranging from local commuter lines to high-speed intercity networks, and luxurious long-distance travel.
      * *Freight Trains:* Specialized cars carry vast quantities of goods like coal, agricultural products, manufactured items, and containers.
  
  * *Advantages of Train Travel*
      * *Efficiency:* Trains can move large amounts of people or cargo with less energy consumption per mile compared to cars or trucks.
      * *Safety:*  Statistically, rail travel is one of the safest modes of transportation.
      * *Reduced Congestion:* Trains help alleviate traffic on roads, especially in densely populated areas.
  [Google](https://www.google.com)  `;

  return (
    <div className="bg-[url('/images/dots.svg')] w-full h-screen overflow-y-auto p-14">
      <Markdown className="prose prose-slate ">{markdown}</Markdown>
    </div>
  );
};

export default page;
