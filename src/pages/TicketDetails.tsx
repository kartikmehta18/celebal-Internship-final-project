
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { Badge } from '@/components/ui/badge';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Avatar, AvatarFallback } from '@/components/ui/avatar';
// import { useAuth } from '@/contexts/AuthContext';
// import { useTickets, Ticket } from '@/contexts/TicketContext';
// import { 
//   ArrowLeft, 
//   Send, 
//   Clock, 
//   User,
//   Calendar,
//   MessageSquare,
//   AlertCircle,
//   CheckCircle,
//   TrendingUp,
//   XCircle
// } from 'lucide-react';
// import { format } from 'date-fns';

// const TicketDetails = () => {
//   const { id } = useParams<{ id: string }>();
//   const { user, isAdmin } = useAuth();
//   const { getTicketById, addComment, updateTicket } = useTickets();
//   const navigate = useNavigate();
  
//   const [ticket, setTicket] = useState<Ticket | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [newComment, setNewComment] = useState('');
//   const [isSubmittingComment, setIsSubmittingComment] = useState(false);

//   useEffect(() => {
//     const fetchTicket = async () => {
//       if (!id) return;
      
//       setLoading(true);
//       try {
//         const fetchedTicket = await getTicketById(id);
//         setTicket(fetchedTicket || null);
//       } catch (error) {
//         console.error('Error fetching ticket:', error);
//         setTicket(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTicket();
//   }, [id, getTicketById]);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
//         <Card className="border-0 shadow-xl dark:bg-gray-800">
//           <CardContent className="p-8 text-center">
//             <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 dark:border-blue-400 mx-auto mb-4"></div>
//             <p className="text-gray-600 dark:text-gray-400">Loading ticket details...</p>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   if (!ticket) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
//         <Card className="border-0 shadow-xl dark:bg-gray-800">
//           <CardContent className="p-8 text-center">
//             <AlertCircle className="h-16 w-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
//             <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Ticket Not Found</h2>
//             <p className="text-gray-600 dark:text-gray-400 mb-6">The ticket you're looking for doesn't exist or has been removed.</p>
//             <Button onClick={() => navigate('/dashboard')}>
//               <ArrowLeft className="h-4 w-4 mr-2" />
//               Back to Dashboard
//             </Button>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   const handleAddComment = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!newComment.trim() || !user) return;

//     setIsSubmittingComment(true);
    
//     await addComment(ticket.id, {
//       ticketId: ticket.id,
//       userId: user.id,
//       userName: user.name,
//       content: newComment,
//       isInternal: false,
//     });
    
//     // Refresh ticket data to show new comment
//     const updatedTicket = await getTicketById(ticket.id);
//     if (updatedTicket) {
//       setTicket(updatedTicket);
//     }
    
//     setNewComment('');
//     setIsSubmittingComment(false);
//   };

//   const handleStatusChange = async (newStatus: string) => {
//     await updateTicket(ticket.id, { status: newStatus as any });
    
//     // Refresh ticket data
//     const updatedTicket = await getTicketById(ticket.id);
//     if (updatedTicket) {
//       setTicket(updatedTicket);
//     }
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'open': return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800';
//       case 'in-progress': return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800';
//       case 'resolved': return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800';
//       case 'closed': return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700';
//       default: return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700';
//     }
//   };

//   const getPriorityColor = (priority: string) => {
//     switch (priority) {
//       case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
//       case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
//       case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
//       case 'urgent': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
//       default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
//     }
//   };

//   const getStatusIcon = (status: string) => {
//     switch (status) {
//       case 'open': return <Clock className="h-4 w-4" />;
//       case 'in-progress': return <TrendingUp className="h-4 w-4" />;
//       case 'resolved': return <CheckCircle className="h-4 w-4" />;
//       case 'closed': return <XCircle className="h-4 w-4" />;
//       default: return <AlertCircle className="h-4 w-4" />;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Header */}
//         <div className="flex items-center gap-4 mb-8">
//           <Button
//             variant="ghost"
//             onClick={() => navigate('/dashboard')}
//             className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
//           >
//             <ArrowLeft className="h-4 w-4" />
//             Back to Dashboard
//           </Button>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Main Content */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Ticket Info */}
//             <Card className="border-0 shadow-xl dark:bg-gray-800">
//               <CardHeader>
//                 <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
//                   <div className="flex-1">
//                     <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
//                       {ticket.title}
//                     </CardTitle>
//                     <div className="flex flex-wrap items-center gap-3">
//                       <Badge className={getStatusColor(ticket.status)}>
//                         {getStatusIcon(ticket.status)}
//                         <span className="ml-1 capitalize">{ticket.status.replace('-', ' ')}</span>
//                       </Badge>
//                       <Badge className={getPriorityColor(ticket.priority)}>
//                         {ticket.priority.toUpperCase()}
//                       </Badge>
//                       <span className="text-sm text-gray-500 dark:text-gray-400 capitalize">
//                         {ticket.category.replace('-', ' ')}
//                       </span>
//                     </div>
//                   </div>
                  
//                   {isAdmin && (
//                     <div className="flex gap-2">
//                       {ticket.status !== 'in-progress' && (
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           onClick={() => handleStatusChange('in-progress')}
//                         >
//                           Mark In Progress
//                         </Button>
//                       )}
//                       {ticket.status !== 'resolved' && (
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           onClick={() => handleStatusChange('resolved')}
//                         >
//                           Mark Resolved
//                         </Button>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 <div className="prose max-w-none">
//                   <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{ticket.description}</p>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Comments */}
//             <Card className="border-0 shadow-xl dark:bg-gray-800">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
//                   <MessageSquare className="h-5 w-5" />
//                   Comments ({ticket.comments.length})
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 {ticket.comments.length === 0 ? (
//                   <div className="text-center py-8">
//                     <MessageSquare className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
//                     <p className="text-gray-600 dark:text-gray-400">No comments yet. Be the first to comment!</p>
//                   </div>
//                 ) : (
//                   <div className="space-y-4">
//                     {ticket.comments.map((comment) => (
//                       <div key={comment.id} className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
//                         <Avatar className="h-10 w-10 flex-shrink-0">
//                           <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
//                             {comment.userName.charAt(0).toUpperCase()}
//                           </AvatarFallback>
//                         </Avatar>
//                         <div className="flex-1">
//                           <div className="flex items-center gap-2 mb-2">
//                             <span className="font-medium text-gray-900 dark:text-white">{comment.userName}</span>
//                             <span className="text-sm text-gray-500 dark:text-gray-400">
//                               {format(new Date(comment.createdAt), 'MMM d, yyyy at h:mm a')}
//                             </span>
//                           </div>
//                           <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{comment.content}</p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}

//                 {/* Add Comment Form */}
//                 <form onSubmit={handleAddComment} className="space-y-4 pt-4 border-t">
//                   <Textarea
//                     value={newComment}
//                     onChange={(e) => setNewComment(e.target.value)}
//                     placeholder="Add a comment..."
//                     className="min-h-[100px]"
//                   />
//                   <Button
//                     type="submit"
//                     disabled={!newComment.trim() || isSubmittingComment}
//                     className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
//                   >
//                     {isSubmittingComment ? (
//                       "Posting..."
//                     ) : (
//                       <>
//                         <Send className="h-4 w-4 mr-2" />
//                         Post Comment
//                       </>
//                     )}
//                   </Button>
//                 </form>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Sidebar */}
//           <div className="space-y-6">
//             {/* Ticket Details */}
//             <Card className="border-0 shadow-xl dark:bg-gray-800">
//               <CardHeader>
//                 <CardTitle className="text-lg text-gray-900 dark:text-white">Ticket Details</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="flex items-center gap-3">
//                   <User className="h-5 w-5 text-gray-400 dark:text-gray-500" />
//                   <div>
//                     <p className="text-sm text-gray-600 dark:text-gray-400">Reporter</p>
//                     <p className="font-medium text-gray-900 dark:text-white">{ticket.userName}</p>
//                   </div>
//                 </div>
                
//                 <div className="flex items-center gap-3">
//                   <Calendar className="h-5 w-5 text-gray-400 dark:text-gray-500" />
//                   <div>
//                     <p className="text-sm text-gray-600 dark:text-gray-400">Created</p>
//                     <p className="font-medium text-gray-900 dark:text-white">{format(new Date(ticket.createdAt), 'MMM d, yyyy')}</p>
//                   </div>
//                 </div>
                
//                 <div className="flex items-center gap-3">
//                   <Clock className="h-5 w-5 text-gray-400 dark:text-gray-500" />
//                   <div>
//                     <p className="text-sm text-gray-600 dark:text-gray-400">Last Updated</p>
//                     <p className="font-medium text-gray-900 dark:text-white">{format(new Date(ticket.updatedAt), 'MMM d, yyyy')}</p>
//                   </div>
//                 </div>

//                 {ticket.assignedTo && (
//                   <div className="flex items-center gap-3">
//                     <User className="h-5 w-5 text-gray-400 dark:text-gray-500" />
//                     <div>
//                       <p className="text-sm text-gray-600 dark:text-gray-400">Assigned To</p>
//                       <p className="font-medium text-gray-900 dark:text-white">{ticket.assignedTo}</p>
//                     </div>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>

//             {/* Quick Actions */}
//             {user?.id === ticket.userId && (
//               <Card className="border-0 shadow-xl dark:bg-gray-800">
//                 <CardHeader>
//                   <CardTitle className="text-lg text-gray-900 dark:text-white">Quick Actions</CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-3">
//                   <Button 
//                     variant="outline" 
//                     className="w-full justify-start"
//                     onClick={() => navigate('/payment')}
//                   >
//                     Upgrade Support Plan
//                   </Button>
//                   <Button 
//                     variant="outline" 
//                     className="w-full justify-start"
//                     onClick={() => navigate('/create-ticket')}
//                   >
//                     Create Related Ticket
//                   </Button>
//                 </CardContent>
//               </Card>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TicketDetails;
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; // Not used in the provided code, can be removed if truly unused
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'; // CardDescription is not used
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { useTickets, Ticket } from '@/contexts/TicketContext';
import {
  ArrowLeft,
  Send,
  Clock,
  User,
  Calendar,
  MessageSquare,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  XCircle
} from 'lucide-react';
import { format } from 'date-fns';

// Assuming Comment type based on its usage
interface Comment {
  id: string;
  ticketId: string;
  userId: string;
  userName: string;
  content: string;
  isInternal: boolean;
  createdAt: string; // Assuming createdAt is a string that date-fns can parse
}

// Extend the Ticket type from TicketContext if it doesn't already include comments, createdAt, updatedAt
// This is a placeholder; ideally, your TicketContext would already define these.
interface ExtendedTicket extends Ticket {
  comments: Comment[];
  createdAt: string; // Assuming createdAt is a string that date-fns can parse
  updatedAt: string; // Assuming updatedAt is a string that date-fns can parse
}

const TicketDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { user, isAdmin } = useAuth();
  const { getTicketById, addComment, updateTicket } = useTickets();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState<ExtendedTicket | null>(null);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  useEffect(() => {
    const fetchTicket = async () => {
      if (!id) return;

      setLoading(true);
      try {
        // Cast to ExtendedTicket, assuming getTicketById fetches all necessary data
        const fetchedTicket = await getTicketById(id) as ExtendedTicket;
        setTicket(fetchedTicket || null);
      } catch (error) {
        console.error('Error fetching ticket:', error);
        setTicket(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id, getTicketById]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <Card className="border-0 shadow-xl dark:bg-gray-800">
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 dark:border-blue-400 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading ticket details...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <Card className="border-0 shadow-xl dark:bg-gray-800">
          <CardContent className="p-8 text-center">
            <AlertCircle className="h-16 w-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Ticket Not Found</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">The ticket you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;

    setIsSubmittingComment(true);

    try {
      // The addComment function in TicketContext should handle adding the comment
      // and ideally return the newly added comment or the updated ticket.
      await addComment(ticket.id, {
        ticketId: ticket.id,
        userId: user.id,
        userName: user.name,
        content: newComment,
        isInternal: false,
        // createdAt would typically be generated on the backend
        // id would typically be generated on the backend
      });

      // Refresh ticket data to show new comment
      const updatedTicket = await getTicketById(ticket.id) as ExtendedTicket;
      if (updatedTicket) {
        setTicket(updatedTicket);
      }
    } catch (error) {
      console.error('Error adding comment:', error);
      // Optionally show an error message to the user
    } finally {
      setNewComment('');
      setIsSubmittingComment(false);
    }
  };

  const handleStatusChange = async (newStatus: 'open' | 'in-progress' | 'resolved' | 'closed') => {
    try {
      await updateTicket(ticket.id, { status: newStatus });

      // Refresh ticket data
      const updatedTicket = await getTicketById(ticket.id) as ExtendedTicket;
      if (updatedTicket) {
        setTicket(updatedTicket);
      }
    } catch (error) {
      console.error('Error updating ticket status:', error);
      // Optionally show an error message to the user
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700';
      default: return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
      case 'urgent': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <Clock className="h-4 w-4" />;
      case 'in-progress': return <TrendingUp className="h-4 w-4" />;
      case 'resolved': return <CheckCircle className="h-4 w-4" />;
      case 'closed': return <XCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Ticket Info */}
            <Card className="border-0 shadow-xl dark:bg-gray-800">
              <CardHeader>
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {ticket.title}
                    </CardTitle>
                    <div className="flex flex-wrap items-center gap-3">
                      <Badge className={getStatusColor(ticket.status)}>
                        {getStatusIcon(ticket.status)}
                        <span className="ml-1 capitalize">{ticket.status.replace('-', ' ')}</span>
                      </Badge>
                      <Badge className={getPriorityColor(ticket.priority)}>
                        {ticket.priority.toUpperCase()}
                      </Badge>
                      <span className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                        {ticket.category.replace('-', ' ')}
                      </span>
                    </div>
                  </div>

                  {isAdmin && (
                    <div className="flex gap-2">
                      {ticket.status !== 'in-progress' && ticket.status !== 'resolved' && ( // Added condition for already resolved
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleStatusChange('in-progress')}
                        >
                          Mark In Progress
                        </Button>
                      )}
                      {ticket.status !== 'resolved' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleStatusChange('resolved')}
                        >
                          Mark Resolved
                        </Button>
                      )}
                       {ticket.status !== 'closed' && ( // Option to close the ticket
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleStatusChange('closed')}
                        >
                          Close Ticket
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{ticket.description}</p>
                </div>
              </CardContent>
            </Card>

            {/* Comments */}
            <Card className="border-0 shadow-xl dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                  <MessageSquare className="h-5 w-5" />
                  Comments ({ticket.comments.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {ticket.comments.length === 0 ? (
                  <div className="text-center py-8">
                    <MessageSquare className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">No comments yet. Be the first to comment!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {ticket.comments.map((comment) => (
                      <div key={comment.id} className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <Avatar className="h-10 w-10 flex-shrink-0">
                          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                            {comment.userName.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium text-gray-900 dark:text-white">{comment.userName}</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {format(new Date(comment.createdAt), 'MMM d, yyyy at h:mm a')}
                            </span>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{comment.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add Comment Form */}
                {/* Only allow comments if the ticket is not closed or if the user is an admin */}
                {(ticket.status !== 'closed' || isAdmin) && (
                  <form onSubmit={handleAddComment} className="space-y-4 pt-4 border-t">
                    <Textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Add a comment..."
                      className="min-h-[100px]"
                    />
                    <Button
                      type="submit"
                      disabled={!newComment.trim() || isSubmittingComment}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      {isSubmittingComment ? (
                        "Posting..."
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Post Comment
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Ticket Details */}
            <Card className="border-0 shadow-xl dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900 dark:text-white">Ticket Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Reporter</p>
                    <p className="font-medium text-gray-900 dark:text-white">{ticket.userName}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Created</p>
                    <p className="font-medium text-gray-900 dark:text-white">{format(new Date(ticket.createdAt), 'MMM d, yyyy')}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Last Updated</p>
                    <p className="font-medium text-gray-900 dark:text-white">{format(new Date(ticket.updatedAt), 'MMM d, yyyy')}</p>
                  </div>
                </div>

                {ticket.assignedTo && (
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Assigned To</p>
                      <p className="font-medium text-gray-900 dark:text-white">{ticket.assignedTo}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            {user?.id === ticket.userId && (
              <Card className="border-0 shadow-xl dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-900 dark:text-white">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => navigate('/payment')}
                  >
                    Upgrade Support Plan
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => navigate('/create-ticket')}
                  >
                    Create Related Ticket
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;