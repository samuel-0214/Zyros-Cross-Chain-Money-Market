use anchor_lang::prelude::*;
use anchor_lang::solana_program::program::invoke_signed;
use anchor_spl::token::Token;

declare_id!("worm2ZoG2kUd4vFXhvjh93UUH596ayRfgQ2MgjNMTth"); 

#[derive(Accounts)]
pub struct PostCrossChainMessage<'info> {
    /// The user who deposited
    #[account(mut)]
    pub user: Signer<'info>,

    /// Wormhole bridge program
    /// Actual: "worm2ZoG2kUd4vFXhvjh93UUH596ayRfgQ2MgjNMTth"
    pub wormhole_program: UncheckedAccount<'info>,

    /// Wormhole config account (fixed address)
    #[account(mut)]
    pub bridge_config: UncheckedAccount<'info>,

    /// Message account to store emitted VAA
    #[account(mut)]
    pub message: Signer<'info>,

    /// Fee collector
    #[account(mut)]
    pub fee_collector: UncheckedAccount<'info>,

    /// System program
    pub system_program: Program<'info, System>,
}

pub fn handle(ctx: Context<PostCrossChainMessage>, payload: Vec<u8>) -> Result<()> {
    let ix = solana_program::instruction::Instruction {
        program_id: ctx.accounts.wormhole_program.key(),
        accounts: vec![
            AccountMeta::new(ctx.accounts.bridge_config.key(), false),
            AccountMeta::new(ctx.accounts.message.key(), true),
            AccountMeta::new(ctx.accounts.fee_collector.key(), false),
            AccountMeta::new_readonly(ctx.accounts.user.key(), true),
        ],
        data: build_wormhole_message_payload(payload),
    };

    let signer_seeds: &[&[&[u8]]] = &[];

    invoke_signed(
        &ix,
        &[
            ctx.accounts.bridge_config.to_account_info(),
            ctx.accounts.message.to_account_info(),
            ctx.accounts.fee_collector.to_account_info(),
            ctx.accounts.user.to_account_info(),
        ],
        signer_seeds,
    )?;

    Ok(())
}

fn build_wormhole_message_payload(payload: Vec<u8>) -> Vec<u8> {
    // Payload is typically [consistency_level (1 byte)] + [user payload]
    let mut data = vec![1]; // consistency level: 1 = confirmed
    data.extend(payload);
    data
}
