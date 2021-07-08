import { useEffect, useState } from "react";
import { firestore } from "../init";
import { INDICES } from "./types";

type ReturnValue<T> = {
  collectionData: T | null;
  error: Error | null;
  isLoading: boolean;
};

export const useFirestoreCollection = <T>(
  collectionIndex: INDICES
): ReturnValue<T> => {
  const [error, setError] = useState<null | Error>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [collectionData, setCollectionData] = useState<T | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    let unsubscribe: () => void;
    const coll = firestore.collection(collectionIndex);
    unsubscribe = coll
      // NOTE this sets up a listener for changes to the collection.
      .onSnapshot((snapshot) => {
        const docs: any[] = [];
        snapshot.forEach(
          (doc) => {
            docs.push(doc.data());
          },
          (err: Error) => {
            setError(err);
          }
        );
        setIsLoading(false);
        setCollectionData(docs as unknown as T); // todo
      });

    // NOTE unsubscribe from listener on unmount
    return () => unsubscribe();
  }, [collectionIndex]);

  return { collectionData, isLoading, error };
};
