import { Segment, Mode } from '@lib/enums';

export type ViewState = {
  [prop in Segment]: {
    selected: Mode,
    values: {
      [key in Mode]: {
        values: string[]
      }
    }
  }
};

export type State = {
  [prop in Segment]?: {
    selected?: Mode,
    values?: {
      [key in Mode]?: {
        values: string[]
      }
    }
  }
};

export type SelectedState = {
  [prop in Segment]?: {
    selected: Mode
  }
}

export type ValueState = {
  [prop in Segment]?: {
    values: {
      [key in Mode]?: {
        values: string[]
      }
    }
  }
}
