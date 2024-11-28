/**
 *
 * This file is an auto generated file and act as ABI for the ICP issuer canister
 * DO NOT MODIFY instead refer to the latest issuer  version https://github.com/dacadeorg/dacade-vc-issuer-rust
 */

export const idlFactory = ({ IDL }: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const SettingsInput = IDL.Record({
    ii_canister_id: IDL.Principal,
    ic_root_key_der: IDL.Vec(IDL.Nat8),
  });
  const Result = IDL.Variant({ Ok: IDL.Text, Err: IDL.Text });
  const DerivationOriginRequest = IDL.Record({
    frontend_hostname: IDL.Text,
  });
  const DerivationOriginData = IDL.Record({ origin: IDL.Text });
  const DerivationOriginError = IDL.Variant({
    Internal: IDL.Text,
    UnsupportedOrigin: IDL.Text,
  });
  const Result_1 = IDL.Variant({
    Ok: DerivationOriginData,
    Err: DerivationOriginError,
  });
  const SignedIdAlias = IDL.Record({ credential_jws: IDL.Text });
  const ArgumentValue = IDL.Variant({ Int: IDL.Int32, String: IDL.Text });
  const CredentialSpec = IDL.Record({
    arguments: IDL.Opt(IDL.Vec(IDL.Tuple(IDL.Text, ArgumentValue))),
    credential_type: IDL.Text,
  });
  const GetCredentialRequest = IDL.Record({
    signed_id_alias: SignedIdAlias,
    prepared_context: IDL.Opt(IDL.Vec(IDL.Nat8)),
    credential_spec: CredentialSpec,
  });
  const IssuedCredentialData = IDL.Record({ vc_jws: IDL.Text });
  const IssueCredentialError = IDL.Variant({
    Internal: IDL.Text,
    SignatureNotFound: IDL.Text,
    InvalidIdAlias: IDL.Text,
    UnauthorizedSubject: IDL.Text,
    UnknownSubject: IDL.Text,
    UnsupportedCredentialSpec: IDL.Text,
  });
  const Result_2 = IDL.Variant({
    Ok: IssuedCredentialData,
    Err: IssueCredentialError,
  });
  const PrepareCredentialRequest = IDL.Record({
    signed_id_alias: SignedIdAlias,
    credential_spec: CredentialSpec,
  });
  const PreparedCredentialData = IDL.Record({
    prepared_context: IDL.Opt(IDL.Vec(IDL.Nat8)),
  });
  const Result_3 = IDL.Variant({
    Ok: PreparedCredentialData,
    Err: IssueCredentialError,
  });
  const Icrc21ConsentPreferences = IDL.Record({ language: IDL.Text });
  const Icrc21VcConsentMessageRequest = IDL.Record({
    preferences: Icrc21ConsentPreferences,
    credential_spec: CredentialSpec,
  });
  const Icrc21ConsentInfo = IDL.Record({
    consent_message: IDL.Text,
    language: IDL.Text,
  });
  const Icrc21ErrorInfo = IDL.Record({ description: IDL.Text });
  const Icrc21Error = IDL.Variant({
    GenericError: IDL.Record({
      description: IDL.Text,
      error_code: IDL.Nat,
    }),
    UnsupportedCanisterCall: Icrc21ErrorInfo,
    ConsentMessageUnavailable: Icrc21ErrorInfo,
  });
  const Result_4 = IDL.Variant({
    Ok: Icrc21ConsentInfo,
    Err: Icrc21Error,
  });
  return IDL.Service({
    add_course_completion: IDL.Func([IDL.Text], [Result], []),
    derivation_origin: IDL.Func([DerivationOriginRequest], [Result_1], []),
    get_credential: IDL.Func([GetCredentialRequest], [Result_2], ["query"]),
    get_ii_id: IDL.Func([], [IDL.Text], []),
    has_completed_course: IDL.Func([IDL.Text, IDL.Principal], [IDL.Bool], []),
    prepare_credential: IDL.Func([PrepareCredentialRequest], [Result_3], []),
    vc_consent_message: IDL.Func([Icrc21VcConsentMessageRequest], [Result_4], []),
  });
};
export const init = ({ IDL }: any) => {
  const SettingsInput = IDL.Record({
    ii_canister_id: IDL.Principal,
    ic_root_key_der: IDL.Vec(IDL.Nat8),
  });
  return [SettingsInput];
};
