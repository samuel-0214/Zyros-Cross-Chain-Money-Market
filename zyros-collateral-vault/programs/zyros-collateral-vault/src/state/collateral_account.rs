use anchor_lang::prelude::*;

#[account]
pub struct CollateralAccount {
    pub amount: u64,
}
