import { Pouchdb, Find } from 'react-pouchdb'
import { Suspense } from 'react'


export default function InitiateConnection() {

    return(
        <Pouchdb name='dbname'>
            <Suspense fallback='loading...'>
                <Find 
                    selector={{
                        name: { $gte: null }
                    }}
                    sort={["name"]}
                    children={({ db, docs }) => (
                        <ul>
                            {docs.map(doc => (
                                <li key={doc.id}>
                                    {doc.name}
                                    <button onClick={() => db.remove(doc)}>Remove</button>
                                </li>
                            ))}
                        </ul>
                    )}
                />
            </Suspense>
        </Pouchdb>
    )
}

