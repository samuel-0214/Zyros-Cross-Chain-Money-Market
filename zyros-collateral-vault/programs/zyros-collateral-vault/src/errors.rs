use anchor_lang::prelude::*;

#[error_code]
pub enum ZyrosError {
    #[msg("Insufficient collateral")]
    InsufficientCollateral,
}
