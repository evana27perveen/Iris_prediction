import React from 'react';

const Table = (props) => {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Sepal Length</th>
                        <th>Sepal Width</th>
                        <th>Petal Length</th>
                        <th>Petal Width</th>
                        <th>Species</th>
                    </tr>
                </thead>
                <tbody>
                    {props.data.map(e => 
                        <tr key={e.id}>
                        <td>
                            {e.sepal_length}
                        </td>
                        <td>
                            {e.sepal_width}
                        </td>
                        <td>
                            {e.petal_length}
                        </td>
                        <td>
                            {e.petal_width}
                        </td>
                        <td>
                            {e.classification}
                        </td>
                    </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Table
