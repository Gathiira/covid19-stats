import React from 'react'

import {
    Card, CardContent, Typography
} from '@material-ui/core';

function InfoBox({title, cases, total }) {
    return (
        <Card className="infobox">
            <CardContent>
                {/* title */}
                <Typography className="infobox__title" color="textSecondary">
                    {title}
                </Typography>

                {/* no. of cases */}
                <h2>{cases}</h2>

                {/* total cases */}
                <Typography className="infobox__total" color="textSecondary">
                    {total} Total
                </Typography>

            </CardContent>
        </Card>
    )
}

export default InfoBox
