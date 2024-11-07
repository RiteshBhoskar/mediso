// app/components/ConcernCard.tsx
import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import dayjs from "dayjs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';

interface ConcernCardProps {
  title: string;
  description: string;
  speciality: string;
  createdAt: Date;
  userName: string,
}

function ConcernCard ({ title, description , speciality , createdAt , userName}:  ConcernCardProps ) {

  const formattedDate = dayjs(createdAt).format('DD/MM/YYYY');
  const formattedTime = dayjs(createdAt).format('HH:mm');

  return (
    <div className="flex justify-center my-4">
    <Card className="w-[420px] bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-xl">
      <CardHeader className="p-4 border-b border-gray-100">
        <CardTitle className="text-2xl font-semibold text-gray-800 mb-2">{title}</CardTitle>
        <CardDescription className="text-sm text-indigo-600 font-medium">{speciality}</CardDescription>
        <div className="flex items-center mt-2 text-gray-600">
          <FaUserCircle className="mr-2" size={18} />
          <CardDescription className="text-xs font-medium">{`Posted by ${userName}`}</CardDescription>
        </div>
      </CardHeader>

      <CardContent className="p-4 text-gray-700">
        <p>{description}</p>
      </CardContent>

      <CardFooter className="p-4 bg-gray-50 text-gray-500 text-xs font-medium border-t border-gray-100">
        {`${formattedTime} · ${formattedDate}`}
      </CardFooter>
    </Card>
  </div>
  );
};

export default ConcernCard;
