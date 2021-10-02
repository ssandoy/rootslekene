import { useEffect, useState } from "react";
import { firestore } from "../init";
import { INDICES } from "./types";

type ReturnValue<T> = {
  collectionData: T[] | null;
  error: Error | null;
  isLoading: boolean;
};

export const useFirestoreCollection = <T>(
  collectionIndex: INDICES
): ReturnValue<T> => {
  const [error, setError] = useState<null | Error>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [collectionData, setCollectionData] = useState<T[] | null>(null);

  useEffect(() => {
    setCollectionData(null);
    setIsLoading(true);
    setError(null);
    const unsubscribe = firestore
      .collection(collectionIndex)
      // NOTE this sets up a listener for changes to the collection.
      .onSnapshot(
        (snapshot) => {
          const docs: T[] = [];
          snapshot.forEach(
            (doc) => {
              docs.push(doc.data() as T); // fixme..
            },
            (err: Error) => {
              setError(err);
            }
          );
          setIsLoading(false);
          setCollectionData(docs);
        },
        (error) => {
          setError(error);
        }
      );

    // NOTE unsubscribe from listener on unmount
    return () => unsubscribe();
  }, [collectionIndex]);

  return { collectionData, isLoading, error };
};
