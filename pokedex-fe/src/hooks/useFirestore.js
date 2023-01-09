import { useEffect, useState, useReducer } from "react"
import { projectFirestore, timestamp } from "../firebase/config"

let initialState = {
    document: null,
    isPending: false, 
    error: null,
    succes: null
}

const firestoreReducer = (state, action) => {
    switch(action.type){
        case 'IS_PENDING': 
            return {isPending: true, document: null, succes: false, error: null}
        case 'ADDED_DOCUMENT':
            return {isPending: false, document: action.payload, succes: true, error: null}
        case 'ERROR':
            return {isPending: false, document: null, succes: false, error: action.payload}
        case 'DELETED_DOCUMENT': 
            return {isPending: false, document: null, succes: true, error: null}
        default: 
        return state
    }
}

export const useFirestore = (collection) => {
    const [response, dispatch] = useReducer(firestoreReducer, initialState)
    const [isCancelled, setIsCancelled] = useState(false)

    // collection ref
    const ref = projectFirestore.collection(collection)

    //only dispatch if not cancelled
    const dispatchIfNotCancelled = (action) => {
        if(!isCancelled){
            dispatch(action)
        }
    }

    //add document 
    const addDocument = async (doc) => {
        dispatch({type:'IS_PENDING'})

        try{
            const createdAt = timestamp.fromDate(new Date())
            const addedDocument = await ref.add({...doc, createdAt})
            dispatchIfNotCancelled({type: 'ADDED_DOCUMENT', payload: addedDocument})
        }catch(err){
            dispatchIfNotCancelled({type: 'ERROR', payload: err.message})
        }
    }

    //delete document 
    const deleteDocument = async (id) => {
        dispatch({type: 'IS_PENDING'})

        try{
            await ref.doc(id).delete()
            dispatchIfNotCancelled({type: 'DELETED_DOCUMENT'})
        }catch(err){
            dispatchIfNotCancelled({type: 'ERROR', payload: 'Could not delete'})
        }
    }


    //cleanup function
    useEffect(() => {
        return () => setIsCancelled(true)
    },[])

    return {addDocument, deleteDocument, response}

}