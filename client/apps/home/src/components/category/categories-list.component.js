import {Suspense} from 'react'

import { CategoriesFallback } from './categories-fallback.component';
import { CategoriesContent } from './categories-content.component';
export default function CategoriesList(props) {
    return (
        <div className="categories-list">
            <Suspense fallback={<CategoriesFallback />}>
                <CategoriesContent />
            </Suspense>
        </div>
    );
}


