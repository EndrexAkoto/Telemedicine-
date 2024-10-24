import React, { useState, useEffect } from 'react'

function Feedback({ doctorId }) {
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        fetch(`/reviews/${doctorId}`)
            .then(response => response.json())
            .then(data => setReviews(data))
    }, [doctorId])

    return (
        <div>
            <h1>Doctor Reviews</h1>
            <ul>
                {reviews.map((review, index) => (
                    <li key={index}>
                        <strong>Review:</strong> {review.review} <br />
                        <strong>Rating:</strong> {review.rating}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Feedback
