import { useEffect, useState, useRef } from "react"
import { projectFirestore } from "../firebase/config"

export const useCollection = (collection, _query, _orderBy) => {
    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)

    const orderBy = useRef(_orderBy).current
    const [query, setNewQuery] = useState(_query)

    useEffect(() => {
        let ref = projectFirestore.collection(collection)
        
        if(query){
            ref = ref.where(...query)
        }

        if(orderBy){
            ref = ref.orderBy(...orderBy)
        }

        const unsub = ref.onSnapshot((snapshot) => {
            let results = []
            snapshot.docs.forEach((doc) => {
                results.push({...doc.data(), id: doc.id})
            })
            //update state
            //console.log(results)
            setDocuments(results)
            setError(null)
        }, (error) => {
            console.log(error)
            setError('Could not fetch the data')
        })

        //unmount component
        return () => unsub()
    }, [collection, query, orderBy])

    //console.log('documents: ', documents)
    return {documents, error}
}