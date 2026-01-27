import React, { FC } from 'react'
import { ExtractedRecord } from '../../Interface';

interface ConnectedPartiesViewProps {
  // Use the interface instead of [] or any[]
  data: ExtractedRecord[];
  // Change rowCount to number if it's passed as a number from MainInfo
}

export const ConnectedPartiesView:FC<ConnectedPartiesViewProps>= () => {
  return (
    <div>ConnectedPartiesView</div>
  )
}
