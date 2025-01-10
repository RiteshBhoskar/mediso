"use client"

import React, { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { ArrowBigUp, ArrowBigDown } from 'lucide-react';
import { VoteType } from '@prisma/client';
import { toast } from 'sonner';
import dayjs from 'dayjs';
import { useSession } from 'next-auth/react';
import LoadingSpinner from "./LoadingSpinner";

interface Concern {
  id: number;
  title: string;
  description: string;
  speciality: string;
  createdAt: Date;
  patientName: string;
  upVotes: number;
  downVotes: number;
  isUpVoted: boolean;
  isDownVoted: boolean;
}


const ConcernCard: React.FC<Concern> = ({
  id,
  title,
  description,
  speciality,
  createdAt,
  patientName,
  upVotes,
  downVotes,
  isUpVoted,
  isDownVoted
}) => {
  const [isUpvoteLoading, setIsUpvoteLoading] = useState(false);
  const [isDownvoteLoading, setIsDownvoteLoading] = useState(false);
  const [currentUpVotes, setCurrentUpVotes] = useState(upVotes);
  const [currentDownVotes, setCurrentDownVotes] = useState(downVotes);
  const [isCurrentUpvoted , setIsCurrentUpvoted] = useState(isUpVoted);
  const [isCurrentDownvoted , setIsCurrentDownvoted] = useState(isDownVoted);



  const handleVote = async (newVoteType: VoteType) => {
    if (newVoteType === VoteType.UPVOTE) setIsUpvoteLoading(true);
    if (newVoteType === VoteType.DOWNVOTE) setIsDownvoteLoading(true);
    const voteLoadingToastId = toast.loading("Updating Vote...");
    try {
      const response = await fetch("/api/concerns/votes", {
        method: 'PATCH',
        headers: {
          'Content-Type' : "application/json"
        },
        body: JSON.stringify({concernId : id ,  voteType: newVoteType}),
      });

      if (response.ok) {
        const { upVotes, downVotes , isUpVoted, isDownVoted } = await response.json();
        toast.dismiss(voteLoadingToastId);
        setCurrentUpVotes(upVotes);
        setCurrentDownVotes(downVotes);
        setIsCurrentUpvoted(isUpVoted);
        setIsCurrentDownvoted(isDownVoted)
        toast.success(`Vote updated successfully`);
      } else {
        toast.dismiss(voteLoadingToastId);
        toast.error(`Error updating vote`);
      }
    } catch (error) {
      toast.dismiss(voteLoadingToastId);
      toast.error(`Error updating vote`);
    } finally {
      setIsUpvoteLoading(false);
      setIsDownvoteLoading(false);
      toast.dismiss(voteLoadingToastId);
    }
  };

  const formattedDate = dayjs(createdAt).format('DD/MM/YYYY');
  const formattedTime = dayjs(createdAt).format('HH:mm');

  return (
    <div className="w-[420px] bg-white shadow-lg rounded-2xl overflow-hidden border transition-transform transform hover:scale-105 border-gray-200 mb-4 font-satoshi">
      <div className="p-4 border-b flex justify-between border-gray-100">
        <div className='grid'>
          <h2 className="text-2xl font-mid text-black mb-2">{title}</h2>
          <p className="text-sm text-indigo-600 font-medium ">{speciality}</p>
        </div>
        
          <div className="grid space-y-2">
            <button
              onClick={() => handleVote(VoteType.UPVOTE)}
              disabled={isUpvoteLoading}
              className={`flex items-center gap-1 rounded-full text-lg ${isCurrentUpvoted ? 'text-green-500 fill-current' : 'text-neutral-500 hover:text-green-500'}`}
            >
              <ArrowBigUp   className={`size-6 ${isCurrentUpvoted ? 'text-green-500 fill-current' : 'text-neutral-500 hover:text-green-500'}`} />
              <span>{currentUpVotes}</span>
            </button>
            <button
              onClick={() => handleVote(VoteType.DOWNVOTE)}
              disabled={isDownvoteLoading}
              className={`flex items-center gap-1 rounded-full text-lg ${isCurrentDownvoted ? 'text-red-500' : 'text-neutral-500 hover:text-red-500'}`}
            >
              <ArrowBigDown className={`size-6 ${isCurrentDownvoted ? 'text-red-500 fill-current' : 'text-neutral-500 hover:text-red-500'}`}
               />
              <span>{currentDownVotes}</span>
            </button>
          </div>
      </div>

      <div className="p-4 text-black">
        <p>{description}</p>
      </div>

      <div className="p-4 bg-gray-50 flex justify-between text-gray-500 text-xs font-medium border-t border-gray-100">
        <div className="flex items-center text-gray-600">
            <FaUserCircle className="mr-2" size={18} />
            <span className="text-xs font-medium">{`Posted by ${patientName}`}</span>
        </div>
        {`${formattedTime} · ${formattedDate}`}
      </div>
    </div>
  );
};

const ConcernsPage = () => {
  const [concerns, setConcerns] = useState<Concern[]>([]);
  const [isLoadingConcerns , setIsLoadingConcerns] = useState(true);

  const  { data: session , status} = useSession();

  useEffect(() => {
    if (status === "authenticated") {
    const fetchConcerns = async () => {
      try {
        setIsLoadingConcerns(true);
        const response = await fetch('/api/concerns?role=patient');
        const data = await response.json();
        setConcerns(data.concerns);
      } catch (error) {
        toast.error('Error fetching concerns');
      } finally {
        setIsLoadingConcerns(false);
      }
    }
     fetchConcerns();
    };
  }, [status]);


  if ( status === "loading") {
    return (
      <LoadingSpinner />
    )
  };


  if ( status === "unauthenticated") {
    return (
      <div className="flex justify-center items-center h-screen">
      <p className="text-lg text-gray-600">Please log in to view concerns.</p>
    </div>
    )
  }

  if(isLoadingConcerns){
    return (
      <LoadingSpinner />
    )
  }

  if (!isLoadingConcerns && concerns.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-600">No concerns available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="grid justify-center space-y-5">
      {(concerns.map((concern) => (
        <ConcernCard key={concern.id} {...concern} />
      )))}
    </div>
  );
};

export default ConcernsPage;