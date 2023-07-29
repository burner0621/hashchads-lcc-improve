import PropTypes from 'prop-types';
import { sentenceCase } from 'change-case';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Chip, Stack, Button } from '@mui/material';
// utils
import getColorName from '../../../../utils/getColorName';
// components
import Iconify from '../../../../components/Iconify';

// ----------------------------------------------------------------------

const RootStyle = styled('div')({
  flexGrow: 1,
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
});

const WrapperStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  overflow: 'hidden',
  alignItems: 'stretch',
  margin: theme.spacing(0.5),
  borderRadius: theme.shape.borderRadius,
  border: `solid 1px ${theme.palette.divider}`,
}));

const LabelStyle = styled('span')(({ theme }) => ({
  ...theme.typography.subtitle2,
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.background.neutral,
  borderRight: `solid 1px ${theme.palette.divider}`,
}));

// ----------------------------------------------------------------------

ShopTagFiltered.propTypes = {
  filters: PropTypes.object,
  isShowReset: PropTypes.bool,
  onRemoveGender: PropTypes.func,
  onRemoveCategory: PropTypes.func,
  onRemoveColor: PropTypes.func,
  onRemovePrice: PropTypes.func,
  onRemoveRating: PropTypes.func,
  onResetAll: PropTypes.func,
};

export default function ShopTagFiltered({
  filters,
  isShowReset,
  onRemoveGender,
  onRemoveCategory,
  onRemoveColor,
  onRemovePrice,
  onRemoveRating,
  onResetAll,
}) {
  const theme = useTheme();

  const { gender, category, colors, priceRange, rating } = filters;

  const min = priceRange[0];

  const max = priceRange[1];

  return (
    <RootStyle>
      {gender.length > 0 && (
        <WrapperStyle>
          <LabelStyle>Gender:</LabelStyle>
          <Stack direction="row" flexWrap="wrap" sx={{ p: 0.75 }}>
            {gender.map((_gender) => (
              <Chip
                key={_gender}
                label={_gender}
                size="small"
                onDelete={() => onRemoveGender(_gender)}
                sx={{ m: 0.5 }}
              />
            ))}
          </Stack>
        </WrapperStyle>
      )}

      {category !== 'All' && (
        <WrapperStyle>
          <LabelStyle>Category:</LabelStyle>
          <Stack direction="row" flexWrap="wrap" sx={{ p: 0.75 }}>
            <Chip size="small" label={category} onDelete={onRemoveCategory} sx={{ m: 0.5 }} />
          </Stack>
        </WrapperStyle>
      )}

      {colors.length > 0 && (
        <WrapperStyle>
          <LabelStyle>Colors:</LabelStyle>
          <Stack direction="row" flexWrap="wrap" sx={{ p: 0.75 }}>
            {colors.map((color) => (
              <Chip
                key={color}
                label={getColorName(color)}
                size="small"
                onDelete={() => onRemoveColor(color)}
                sx={{
                  m: 0.5,
                  bgcolor: color,
                  color: theme.palette.getContrastText(color),
                  ...((color === '#FFFFFF' || color === '#000000') && {
                    border: `solid 1px ${theme.palette.grey[500_32]}`,
                    '& .MuiChip-deleteIcon': {
                      color: 'text.disabled',
                    },
                  }),
                }}
              />
            ))}
          </Stack>
        </WrapperStyle>
      )}

      {(min !== 0 || max !== 200) && (
        <WrapperStyle>
          <LabelStyle>Price:</LabelStyle>
          <Stack direction="row" flexWrap="wrap" sx={{ p: 0.75 }}>
            <Chip size="small" label={`$${min} - ${max}`} onDelete={onRemovePrice} sx={{ m: 0.5 }} />
          </Stack>
        </WrapperStyle>
      )}

      {rating && (
        <WrapperStyle>
          <LabelStyle>Rating:</LabelStyle>
          <Stack direction="row" flexWrap="wrap" sx={{ p: 0.75 }}>
            <Chip size="small" label={sentenceCase(rating)} onDelete={onRemoveRating} sx={{ m: 0.5 }} />
          </Stack>
        </WrapperStyle>
      )}

      {isShowReset && (
        <Button color="error" size="small" onClick={onResetAll} startIcon={<Iconify icon={'ic:round-clear-all'} />}>
          Clear All
        </Button>
      )}
    </RootStyle>
  );
}
