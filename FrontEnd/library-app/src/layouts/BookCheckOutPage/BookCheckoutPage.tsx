import { useEffect, useState } from "react"
import BookModel from "../../models/BookModel"
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { StarsReview } from "../Utils/StarReview";
import { CheckoutAndReviewBox } from "./CheckoutAndReviesBox";
import ReviewModel from "../../models/ReviewModel";
import { error } from "console";
import { LatestReview } from "./LatestReview";
import { useOktaAuth } from "@okta/okta-react";
import { METHODS } from "http";

export const BookCheckoutPage = () => {


    const baseUrl = "http://localhost:8080/api/books/secure"


    const {authState } = useOktaAuth();

    //Review State
    const [review, setReview] = useState<ReviewModel[]>([]);
    const [totalStars,setTotalStars] = useState(0);
    const [isLoadingReview,setIsLoadingReview] = useState(true);


    //loans count state

    const [currentLoansCount, setCurrentLoansCount] = useState(0);
    const [isLoadingCurrentLoansCount, setIsLoadingCurrentLoansCount] = useState(true);


    //Is book checked out 
    const [isCheckedOut, setIsCheckedOut] = useState(false);
    const [isLoadingBookCheckedOut , setIsLoadingBookCheckedOut] = useState(true);




    const [book,setBook] = useState<BookModel>();
    const [isLoading, setIsLoading] = useState(true);
    const [httpError , setHttpError] = useState(null);

    const bookId = (window.location.pathname).split('/')[2];

    useEffect(() => {
        const fetchBook = async ()=>{

            const baseUrl: string = `http://localhost:8080/api/books/${bookId}`;
            
            
            const response = await fetch(baseUrl);

            if(!response.ok){
                throw new Error('Something went wrong!')

            }


            const responseJson = await response.json();

            const loadedBook: BookModel = {
                
                id: responseJson.id,
                title: responseJson.title,
                author: responseJson.author,
                description: responseJson.description,
                category: responseJson.category,
                copies: responseJson.copies,
                copiesAvailable: responseJson.copiesAvailable, 
                img: responseJson.img,
            };

            setBook(loadedBook);
            setIsLoading(false);
            
            

            
        };
        fetchBook().catch((error:any)=> {
            setIsLoading(false);
            setHttpError(error.message);
        })
    }, [isCheckedOut])

    useEffect(()=> {
        const fetchReview = async () => {
            
            const baseUrl: string = `http://localhost:8080/api/reviews/search/findByBookId?bookId=${bookId}`;
            const response = await fetch(baseUrl);

            if(!response.ok){
                throw new Error('Something went wrong!')

            }

            const responseJson = await response.json();
            const responseData = responseJson._embedded.reviews;

            const loadedReview: ReviewModel[] = [];
                
            let weightedStarReviews: number = 0 ;

            for(const key in responseData){
                loadedReview.push({
                    id: responseData[key].id,
                    userEmail: responseData[key].userEmail,
                    date: responseData[key].date,
                    rating: responseData[key].rating,
                    bookId: responseData[key].bookId,
                    reviewDescription: responseData[key].reviewDescription,
                })

                weightedStarReviews = weightedStarReviews + responseData[key].rating
            }

            if(loadedReview){
                const round = (Math.round((weightedStarReviews/loadedReview.length)*2)/2).toFixed(1);
                setTotalStars(Number(round));
            }

            setReview(loadedReview);
            setIsLoadingReview(false);

            

        };

        fetchReview().catch((error:any) => {
            setIsLoadingReview(false)
            setHttpError(error.message)
        })
    },[]);

    useEffect(()=> {

        const fetchUserCurrentLoansCount = async () => {
            if ( authState && authState.isAuthenticated){

                const url = baseUrl + "/currentloans/count";
                const reqOptions = {
                    method : "GET",
                    headers : {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application'
                    }
                };

                const currentLoansCountResponse = await fetch(url,reqOptions)

                if(!currentLoansCountResponse.ok){
                    throw new Error("Something went wrong")

                }

                const currentLoansCountJson = await currentLoansCountResponse.json();

                setCurrentLoansCount(currentLoansCountJson);

                setIsLoadingCurrentLoansCount(false);

            }

        }
        fetchUserCurrentLoansCount().catch((error:any) => {
            setIsLoadingCurrentLoansCount(false);
            setHttpError(error.message)
        } )
    }, [authState , isCheckedOut])


    useEffect(() => {
        

            const fetchUserChecked = async () => {
                if (authState && authState.isAuthenticated) {
                const url = `${baseUrl}/ischeckedout/byuser?bookId=${bookId}`
                const reqOptions = {
                    method : "GET",
                        headers : {
                            Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                            'Content-Type': 'application'
                        }
                }
    
                const booksChecketOut = await fetch(url, reqOptions);
    
                if (!booksChecketOut.ok) {
    
                    throw new Error("Something went wrong");
                 }
    
                const booksChecketOutResponseJson = await booksChecketOut.json();
    
                setIsCheckedOut(booksChecketOutResponseJson);
            
        }
        setIsLoadingBookCheckedOut(false);
       
        }
        fetchUserChecked().catch( (error:any ) => {
            setIsLoadingBookCheckedOut(false);
            setHttpError(error.message);

        })
    }, [ authState])

    if(isLoading|| isLoadingReview || isLoadingCurrentLoansCount || isLoadingBookCheckedOut){

        return (
            <SpinnerLoading/>
        )
       
    }
    if (httpError) {
        <div className="container m-5">
            <p>{httpError}</p>
        </div>
    }

    async function checkoutBook(){
        const url = `${baseUrl}/checkout?bookId=${bookId}`

        const reqOptions = {
            method : "PUT",
                headers : {
                    Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                    'Content-Type': 'application'
                }
        }

        const checkoutResponse = await fetch(url, reqOptions);

        if (!checkoutResponse.ok) {

            throw new Error("Something went wrong!")
            


        }

        setIsCheckedOut(true);

        


        
    }

    return(
        <div>
            <div className="container d-none d-lg-block">
                <div className="row mt-5">
                    <div className="col-sm-2 col-md-2">
                        {book?.img ? 
                        <img src={book?.img} width='226' alt="Book" />
                        :
                        <img src={require('../../Images/BooksImages/book-luv2code-1000.png')} width='226'
                        height='349' alt="Book"/>
                        }
                    </div>
                    <div className="col-4 col-md-4 container">
                        <div className="ml-2">
                            <h2>{book?.title}</h2>
                            <h5 className="text-primary">{book?.author}</h5>
                            <p className="lead">{book?.description}</p>
                        </div>
                        <StarsReview rating={totalStars} size={32} />
                    </div>
                    <CheckoutAndReviewBox book={book} mobile={false} currentLoansCount={currentLoansCount} isAuthenticated={authState?.isAuthenticated} isCheckedOut={isCheckedOut} checkoutBook={checkoutBook}/>
                </div>
                <hr/>
                <LatestReview reviews={review} bookId={book?.id} mobile={false}/>
            </div>
            <div className="container d-lg-none mt-5">
                <div className="'d-flex justify-content-center align-items-center">
                {book?.img ? 
                        <img src={book?.img} width='226' alt="Book" />
                        :
                        <img src={require('../../Images/BooksImages/book-luv2code-1000.png')} width='226'
                        height='349' alt="Book"/>
                        }
                </div>
                <div className="mt-4">
                    <div className="ml-2">
                        <h2>{book?.title}</h2>
                        <h5 className="text-primary">{book?.author}</h5>
                        <p className="lead">{book?.description}</p>
                        <StarsReview  rating={totalStars} size={16} />
                    </div>
                </div>
                <CheckoutAndReviewBox book={book} mobile={true} currentLoansCount={currentLoansCount} isAuthenticated={authState?.isAuthenticated} isCheckedOut={isCheckedOut} checkoutBook={checkoutBook}/>
                <hr/>
                <LatestReview reviews={review} bookId={book?.id} mobile={true}/>

            </div>
        </div>
    )
}