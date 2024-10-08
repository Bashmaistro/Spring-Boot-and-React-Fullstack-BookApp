import { Link } from "react-router-dom";
import BookModel from "../../models/BookModel";
import { useOktaAuth } from "@okta/okta-react";
import { LeaveReview } from "../Utils/LeaveAReview";

export const CheckoutAndReviewBox: React.FC<{book: BookModel | undefined, mobile: boolean , currentLoansCount: number, isCheckedOut:boolean , isAuthenticated:any,
    checkoutBook:any , isUserReviewLeft:boolean , submitReview: any}> = (props) =>{

    const { authState} = useOktaAuth();

    function buttonRender() {

        if (props.isAuthenticated) {
            if(!props.isCheckedOut && props.currentLoansCount < 5){
                return (
                    <button onClick={() => props.checkoutBook()} className="btn btn-success btn-lg">Checkout</button>
                )
            }else if (props.isCheckedOut){
                return (
                    <p><b>Book cheked out. Enjoy!</b></p>
                )

            }else if (!props.isCheckedOut ){
                return (
                    <p className="text-danger">Too many book checked out.</p>
                )
            }
            
        }

        return(
            <Link className="btn btn-success btn-lg" to={'/login'}>Sign In</Link>
        )
    }

    function reviewRender() {
        console.log(props.isAuthenticated + "  " + props.isUserReviewLeft);
        
        if (props.isAuthenticated && !props.isUserReviewLeft) {
            console.log("review birakti ve giris yapti");
            
            return(
                <p><LeaveReview submitReview={props.submitReview}/></p>
            )
            
        }else if(!props.isAuthenticated){
            return (<p>Sign in to be able to leave a review.</p>)
        }else if (props.isAuthenticated && props.isUserReviewLeft){
            console.log("review birakmadi ve giris yapti");
            return (
                <p>Thank for your review</p>
            )
        }
    }

    return(
        <div className={props.mobile ? 'card d-flex mt-5' : 'card col-3 container d-flex mb-5'}>
            <div className="card-body container">
                <div className="mt-3">
                    <p>
                        <b>{props.currentLoansCount}/5 </b>
                        books checked out
                    </p>
                    <hr/>
                    {props.book && props.book.copiesAvailable && props.book.copiesAvailable > 0 ?
                         <h4 className="text-success">
                            Available
                         </h4>
                        :
                        <h4 className="text-danger">
                            Wait List
                        </h4>
                    }
                    <div className="row">
                        <p className="col-6 lead">
                            <b>{props.book?.copies + " "}</b>
                            copies
                        </p>
                        <p className="col-6 lead">
                            <b>{props.book?.copiesAvailable + " "}</b>
                            available
                        </p>
                    </div>
                </div>{buttonRender()}
                
                <hr/>
                <p className="mt-3">
                    This number can change until placing order has been complete.
                </p>
                {reviewRender()}
            </div>
        </div>
    )
}